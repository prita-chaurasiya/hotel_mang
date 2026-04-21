import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Users,
  Bed,
  Wifi,
  Coffee,
  Bath,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Star,
  Home,
  Wind,
  Tv,
  Utensils,
  Dumbbell,
  Waves,
  Wine,
} from 'lucide-react';
import { getRoomById } from '../services/contentService';

const RoomDetail = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await getRoomById(id);
        if (!cancelled) setRoom(data);
      } catch {
        if (!cancelled) setRoom(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Room not found</h2>
          <Link to="/rooms" className="text-primary-600 hover:text-primary-700">
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  const images = room.images?.length ? room.images : [room.image].filter(Boolean);

  return (
    <>
      <Helmet>
        <title>{room.name} - Royella Resort</title>
        <meta name="description" content={room.description} />
      </Helmet>

      <div className="bg-gray-50 pb-12 pt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/rooms"
            className="mb-6 inline-flex items-center gap-2 text-gray-600 transition hover:text-primary-600"
          >
            <ArrowLeft size={20} />
            Back to Rooms
          </Link>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="overflow-hidden rounded-xl bg-white shadow-lg">
                <img
                  src={images[0]}
                  alt={room.name}
                  loading="eager"
                  decoding="async"
                  className="h-96 w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {images.slice(1).map((img, index) => (
                  <img
                    key={`${room.id}-img-${index}`}
                    src={img}
                    alt={`${room.name} view ${index + 2}`}
                    loading="lazy"
                    decoding="async"
                    className="h-24 w-full cursor-pointer rounded-lg object-cover transition hover:opacity-80"
                  />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
                <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1">
                  <Star size={16} className="fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{room.rating}</span>
                  <span className="text-sm text-gray-600">({room.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-4 border-b pb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={18} />
                  <span>{room.capacity} Guests</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Bed size={18} />
                  <span>{room.beds}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Home size={18} />
                  <span>{room.size}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">Description</h3>
                <p className="leading-relaxed text-gray-600">{room.longDescription || room.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {room.amenities.map((amenity, index) => {
                    let Icon = CheckCircle;
                    if (amenity.includes('WiFi')) Icon = Wifi;
                    else if (amenity.includes('Breakfast')) Icon = Coffee;
                    else if (amenity.includes('Bath') || amenity.includes('Shower')) Icon = Bath;
                    else if (amenity.includes('TV')) Icon = Tv;
                    else if (amenity.includes('Dining') || amenity.includes('Restaurant')) Icon = Utensils;
                    else if (amenity.includes('Gym') || amenity.includes('Fitness')) Icon = Dumbbell;
                    else if (amenity.includes('Pool')) Icon = Waves;
                    else if (amenity.includes('Bar')) Icon = Wine;
                    else if (amenity.includes('AC') || amenity.includes('Air')) Icon = Wind;

                    return (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        {Icon === CheckCircle ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <Icon size={16} className="text-primary-600" />
                        )}
                        {amenity}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary-600">${room.price}</span>
                    <span className="text-gray-500">/night</span>
                    {room.originalPrice && (
                      <span className="ml-2 text-gray-400 line-through">${room.originalPrice}</span>
                    )}
                  </div>
                  <Link
                    to={`/booking/${room.id}`}
                    className="flex items-center gap-2 rounded-lg bg-primary-600 px-8 py-3 text-white transition hover:bg-primary-700"
                  >
                    <Calendar size={18} />
                    Book Now
                  </Link>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    ✅ Free cancellation up to 7 days before check-in
                    <br />
                    ✅ Best price guarantee
                    <br />✅ No hidden fees
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetail;
