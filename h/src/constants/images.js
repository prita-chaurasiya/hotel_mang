/**
 * Central hotel imagery (Unsplash, optimized with width + quality).
 * Swap URLs or wire to your CDN later.
 */
const u = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;

export const hotelImages = {
  hero: u('photo-1566073771259-6a8506099945', 1920),
  lobby: u('photo-1542314831-068cd1dbfeeb', 1600),
  pool: u('photo-1584132967334-10e028bd69f7', 1600),
  dining: u('photo-1571003123894-1f0594d2b5d9', 1600),
  spa: u('photo-1544161515-4ab6ce6db874', 1400),
  beach: u('photo-1520250497591-112f2f40a3f4', 1600),
  lounge: u('photo-1582719509869-41e7e4ebc6b5', 1400),
  gym: u('photo-1534438327276-14e5300c3a48', 1400),
  contactBanner: u('photo-1564501049412-61c2a3083791', 1800),
  newsletterBg: u('photo-1542314831-068cd1dbfeeb', 1920),
  roomsPageBanner: u('photo-1611892440504-42a792e54d33', 1920),
  dashboardWelcome: u('photo-1566073771259-6a8506099945', 1920),
};

export const roomPhotos = {
  presidential: u('photo-1582719478250-c89cae4dc85b', 1200),
  deluxeOcean: u('photo-1618773928121-c32242e63f39', 1200),
  executive: u('photo-1590490360182-c33d57733427', 1200),
  family: u('photo-1566665797739-1674de7a421a', 1200),
  standard: u('photo-1591088398332-8a779197284f', 1200),
  detail2: u('photo-1578683010236-d716f9a3f461', 1000),
  detail3: u('photo-1584132967334-10e028bd69f7', 1000),
};

export const gallerySlides = [
  { url: u('photo-1542314831-068cd1dbfeeb', 1200), title: 'Luxury Suite' },
  { url: u('photo-1584132967334-10e028bd69f7', 1200), title: 'Infinity Pool' },
  { url: u('photo-1571003123894-1f0594d2b5d9', 1200), title: 'Fine Dining' },
  { url: u('photo-1544161515-4ab6ce6db874', 1200), title: 'Spa Center' },
  { url: u('photo-1520250497591-112f2f40a3f4', 1200), title: 'Beach View' },
  { url: u('photo-1582719509869-41e7e4ebc6b5', 1200), title: 'Executive Lounge' },
];

/** Highlight tiles for amenities section */
export const amenityHighlights = [
  { title: 'Infinity pool', caption: 'Sunrise laps & cabanas', image: u('photo-1584132967334-10e028bd69f7', 900) },
  { title: 'Spa & wellness', caption: 'Treatments & sauna', image: u('photo-1544161515-4ab6ce6db874', 900) },
  { title: 'Chef’s table', caption: 'Coastal tasting menus', image: u('photo-1571003123894-1f0594d2b5d9', 900) },
  { title: 'Fitness studio', caption: 'Classes & trainers', image: u('photo-1534438327276-14e5300c3a48', 900) },
];

export const guestAvatars = {
  e1: u('photo-1494790108377-be9c29b29330', 200),
  m1: u('photo-1507003211169-0a1dd7228f2d', 200),
  e2: u('photo-1438761681033-6461ffad8d80', 200),
  m2: u('photo-1500648767791-00dcc994a43e', 200),
};
