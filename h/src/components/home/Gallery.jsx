import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { gallerySlides as fallbackGallery } from '../../constants/images';
import { getHomePage } from '../../services/contentService';

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState(
    fallbackGallery.map((g) => ({ url: g.url, title: g.title }))
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const home = await getHomePage();
        if (!cancelled && home.gallery?.length) {
          setImages(home.gallery);
        }
      } catch {
        /* fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-playfair">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our beautiful property through stunning visuals
          </p>
        </motion.div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className="gallery-swiper pb-12"
        >
          {images.map((image, index) => (
            <SwiperSlide key={`${image.title}-${index}`}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/45 group-hover:opacity-100">
                  <p className="px-2 text-center font-semibold text-white">{image.title}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 text-white hover:text-gray-300"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={32} />
            </button>
            <button
              type="button"
              className="absolute left-4 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={48} />
            </button>
            <button
              type="button"
              className="absolute right-4 text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={48} />
            </button>
            <img
              src={images[currentImage]?.url}
              alt={images[currentImage]?.title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
