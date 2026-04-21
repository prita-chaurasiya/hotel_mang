import { roomAPI, publicContentAPI } from './api';

/**
 * Public website content: tries backend API first, then `/public/data/*.json` (same UX as production).
 * Backend routes (optional): GET /public/home, GET /rooms, GET /rooms/:id
 */

const base = () => (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');

async function fetchLocalJson(file) {
  const res = await fetch(`${base()}data/${file}`);
  if (!res.ok) throw new Error(`Missing static data: data/${file}`);
  return res.json();
}

let homeCache;
let roomsCache;

export function clearPublicContentCache() {
  homeCache = undefined;
  roomsCache = undefined;
}

/**
 * Home page bundle: hero slides, gallery, testimonials, amenity highlight tiles, SEO.
 */
export async function getHomePage() {
  if (homeCache) return homeCache;
  try {
    const { data } = await publicContentAPI.getHome();
    homeCache = data;
    return data;
  } catch {
    const data = await fetchLocalJson('home.json');
    homeCache = data;
    return data;
  }
}

/**
 * All rooms for listing + detail fallback.
 */
export async function getRooms() {
  if (roomsCache) return roomsCache;
  try {
    const { data } = await roomAPI.getAllRooms();
    const list = Array.isArray(data) ? data : data?.rooms;
    if (Array.isArray(list) && list.length) {
      roomsCache = list.map((r) => ({
        ...r,
        image: r.image || r.images?.[0],
      }));
      return roomsCache;
    }
    throw new Error('Empty rooms response');
  } catch {
    const data = await fetchLocalJson('rooms.json');
    roomsCache = (data.rooms || []).map((r) => ({
      ...r,
      image: r.image || r.images?.[0],
    }));
    return roomsCache;
  }
}

export async function getFeaturedRooms(limit = 3) {
  const rooms = await getRooms();
  const featured = rooms.filter((r) => r.featured);
  return (featured.length ? featured : rooms).slice(0, limit);
}

/**
 * Single room (detail page).
 */
function normalizeRoom(r) {
  if (!r) return null;
  const image = r.image || r.images?.[0];
  const images = r.images?.length ? r.images : image ? [image] : [];
  return { ...r, image, images };
}

export async function getRoomById(id) {
  try {
    const { data } = await roomAPI.getRoomById(id);
    if (data) return normalizeRoom(data);
  } catch {
    /* use static */
  }
  const rooms = await getRooms();
  return normalizeRoom(rooms.find((r) => String(r.id) === String(id)) || null);
}

export async function getRoomsPageMeta() {
  try {
    const data = await fetchLocalJson('rooms.json');
    return { bannerImage: data.bannerImage || null };
  } catch {
    return { bannerImage: null };
  }
}
