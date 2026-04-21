import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, ChevronRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { hotelImages } from '../../constants/images';
import { getHomePage } from '../../services/contentService';
import RoomSearch from './RoomSearch';

const fallbackSlides = [
  {
    id: 'fallback-1',
    image: hotelImages.hero,
    badge: 'Award Winning Resort',
    titleLine1: 'Experience Luxury',
    titleAccent: '& Comfort',
    subtitle:
      'Discover unparalleled hospitality at Royella Resort — where every stay becomes a cherished memory.',
  },
];

const Hero = () => {
  const [slides, setSlides] = useState(fallbackSlides);
  const [active, setActive] = useState(0);
  const [autoplayMs, setAutoplayMs] = useState(6500);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const home = await getHomePage();
        if (cancelled) return;
        if (home.heroAutoplayMs) setAutoplayMs(home.heroAutoplayMs);
        if (home.heroSlides?.length) {
          setSlides(home.heroSlides);
        }
      } catch {
        /* keep fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const slide = slides[active] || slides[0];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Swiper
        key={slides.map((s) => s.id).join('-')}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        speed={900}
        autoplay={{
          delay: autoplayMs,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="hero-swiper absolute inset-0 z-0 h-full w-full"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id} className="!h-full">
            <img
              src={s.image}
              alt=""
              className="h-full min-h-[100vh] w-full object-cover"
              loading={s.id === slides[0].id ? 'eager' : 'lazy'}
              decoding="async"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-black/70 to-black/45" />

      <div className="relative z-20 flex min-h-screen items-center">
        <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <motion.div
              key={slide?.badge}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm"
            >
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{slide?.badge}</span>
            </motion.div>

            <h1 className="mb-6 font-playfair text-5xl font-bold leading-tight md:text-7xl">
              {slide?.titleLine1}{' '}
              <span className="text-primary-500">{slide?.titleAccent}</span>
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-200 md:text-2xl">{slide?.subtitle}</p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/rooms">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-3 text-white transition hover:bg-primary-700"
                >
                  Explore Rooms
                  <ChevronRight className="transition group-hover:translate-x-1" size={18} />
                </motion.span>
              </Link>

              <a href="#gallery">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3 text-white transition hover:bg-white hover:text-primary-700"
                >
                  <Play size={18} />
                  Photo gallery
                </motion.span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <RoomSearch />
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 transform cursor-pointer"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white">
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="mt-2 h-3 w-1 rounded-full bg-white"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
