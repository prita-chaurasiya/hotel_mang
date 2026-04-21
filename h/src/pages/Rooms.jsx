import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Grid, List } from 'lucide-react';
import RoomCard from '../components/ui/RoomCard';
import { hotelImages } from '../constants/images';
import { getRooms, getRoomsPageMeta } from '../services/contentService';

const Rooms = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [banner, setBanner] = useState(hotelImages.roomsPageBanner);

  const guestsParam = Number(searchParams.get('guests')) || 0;
  const typeParam = searchParams.get('type') || '';

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await getRooms();
        if (!cancelled) setRooms(list);
      } catch {
        if (!cancelled) setRooms([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const meta = await getRoomsPageMeta();
        if (!cancelled && meta.bannerImage) setBanner(meta.bannerImage);
      } catch {
        /* default banner */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((r) => {
      if (guestsParam && r.capacity < guestsParam) return false;
      if (typeParam && r.name !== typeParam) return false;
      const q = query.trim().toLowerCase();
      if (q && !r.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rooms, guestsParam, typeParam, query]);

  const hasActiveFilters = Boolean(guestsParam || typeParam || query.trim());

  return (
    <>
      <Helmet>
        <title>Our Rooms - Royella Resort</title>
        <meta
          name="description"
          content="Browse our luxurious rooms and suites at Royella Resort. Find the perfect accommodation for your stay."
        />
      </Helmet>

      <div className="bg-gray-50 pb-12 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mb-10 h-56 w-full overflow-hidden rounded-2xl sm:h-72"
          >
            <img
              src={banner}
              alt=""
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
              <h1 className="font-playfair text-4xl font-bold md:text-5xl">Our Rooms & Suites</h1>
              <p className="mt-2 max-w-2xl text-lg text-white/90">
                Choose from our collection of luxurious accommodations
              </p>
            </div>
          </motion.div>

          {hasActiveFilters && (
            <p className="mb-4 text-sm text-gray-600">
              Filters:
              {guestsParam ? ` ${guestsParam}+ guests` : ''}
              {typeParam ? ` · ${typeParam}` : ''}
              {query.trim() ? ` · “${query.trim()}”` : ''}
            </p>
          )}

          <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" size={20} />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search rooms..."
                  className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select
                className="rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-primary-500"
                value={typeParam || ''}
                onChange={(e) => {
                  const v = e.target.value;
                  const next = new URLSearchParams(searchParams);
                  if (v) next.set('type', v);
                  else next.delete('type');
                  setSearchParams(next);
                }}
              >
                <option value="">All room names</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg p-3 transition ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg p-3 transition ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600" />
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
                  : 'space-y-6'
              }
            >
              {filteredRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} viewMode={viewMode} index={index} />
              ))}
            </div>
          )}

          {!loading && filteredRooms.length === 0 && (
            <p className="py-12 text-center text-gray-600">No rooms match your filters.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Rooms;
