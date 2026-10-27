import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import NotFound from "./pages/not-found/not-found";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

import { useSiteData } from "./hooks/useSiteData";

import "./styles/global.css";
import "./styles/loading.css";

import Committee from "./pages/committee/committee";
import Sponsors from "./pages/sponsors/sponsors";
import Gallery from "./pages/gallery/gallery";
import Events from "./pages/events/events";
import FAQ from "./pages/faq/faq";

import Contact from "./pages/contact/contact";
import PrivacyPolicy from "./pages/privacy-policy/privacyPolicy";
import EventSchedule from "./components/event/schedule/eventSchedule";

import Hackathon from "./pages/events/hackathons/hackathons";
import GameJam from "./pages/events/gamejams/gamejams";
import PwnSussex from "./pages/events/pwnsussex/pwnsussex";
import CodersCup from "./pages/events/coderscup/coderscup";

import LeafBorder from "./components/border/leafBorder";

const App = () => {
  const { loading } = useSiteData();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <LeafBorder side="left" />
      <LeafBorder side="right" />
      <div className="background-grid"></div>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/committee" element={<Committee />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/schedules/:eventId" element={<EventSchedule />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/events/hackathons" element={<Hackathon />} />
          <Route path="/events/pwnsussex" element={<PwnSussex />} />
          <Route path="/events/gamejams" element={<GameJam />} />
          <Route path="/events/coderscup" element={<CodersCup />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
