import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { guestAvatars } from '../../constants/images';
import { getHomePage } from '../../services/contentService';

const fallback = [
  {
    id: 1,
    name: 'Emily Johnson',
    location: 'New York, USA',
    rating: 5,
    text: 'Absolutely incredible experience! The staff went above and beyond.',
    image: guestAvatars.e1,
  },
];

const Testimonials = () => {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const home = await getHomePage();
        if (!cancelled && home.testimonials?.length) {
          setItems(home.testimonials);
        }
      } catch {
        /* fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-20 bg-primary-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-playfair">
            Guest Reviews
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            What our guests say about their stay at Royella Resort
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {items.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-xl"
              >
                <Quote className="mb-4 h-12 w-12 text-primary-600 opacity-50" />
                <p className="mb-6 leading-relaxed text-gray-700">{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    loading="lazy"
                    decoding="async"
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                    <div className="mt-1 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
