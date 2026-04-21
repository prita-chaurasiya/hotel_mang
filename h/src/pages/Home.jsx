import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturedRooms from '../components/home/FeaturedRooms';
import Amenities from '../components/home/Amenities';
import Gallery from '../components/home/Gallery';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import { getHomePage } from '../services/contentService';

const defaultSeo = {
  title: 'Royella Resort - Luxury Hotel & Resort',
  description:
    'Experience luxury and comfort at Royella Resort. Book your stay at the best beachfront resort with world-class amenities.',
};

const Home = () => {
  const [seo, setSeo] = useState(defaultSeo);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const home = await getHomePage();
        if (!cancelled && home.seo?.title) {
          setSeo({
            title: home.seo.title,
            description: home.seo.description || defaultSeo.description,
          });
        }
      } catch {
        /* default */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <Hero />
      <FeaturedRooms />
      <Amenities />
      <Gallery />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default Home;
