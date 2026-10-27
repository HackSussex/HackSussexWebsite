import React, { useState, useEffect } from 'react';

import Carousel from '../components/Carousel';
import SocialMediaBanner from '../components/SocialMediaBanner';
import AboutHeader from '../components/AboutHeader';
import HomeEvents from '../components/HomeEvents';
import UpcomingEvents from '../components/UpcomingEvents';

const Home = () => {
  const [loading, setLoading] = useState(true);

  const waitForLoad = () => {
    if (document.readyState === "complete") {
      setLoading(false);
    }
  };

  useEffect(() => {
    waitForLoad();
  }, []);

  return (
    <>
      <Carousel />
      {/* <UpcomingEvents /> */}
      <AboutHeader />
      <SocialMediaBanner />
      <HomeEvents />
    </>
  );
}

export default Home;
