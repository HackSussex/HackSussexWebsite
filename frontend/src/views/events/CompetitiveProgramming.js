import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import EventWhereWhen from '../../components/EventWhereWhen';
import AboutSection from '../../components/AboutSection';
import background from '../../assets/Events/CompetitiveProgramming/CompetitiveProgrammingBackground.jpg';

const CompetitiveProgramming = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const defaultStyle = {
      textDecoration: "none",
      color: "white"
  };

  const hoverStyle = {
      textDecoration: "none",
      color: "var(--teal)"
  };

  return (
    <>
      <div className="carousel-inner p-0">
        <img src={background} className="d-block w-100 img-fluid splash" alt='Background' />
        <div className="carousel-caption">
          <p className='display-4' style={{color: "var(--electric-green)"}}>Competitive Programming</p>
        </div>
      </div>
      <AboutSection description={[`New this term - competitive programming workshops. Following the success of both our weekly Leetcoding workshops and HackSussex's own competitive programming at recent UKIEPC events, we are bringing to you NEW competitive programming sessions designed to tackle problems akin to the hardest on Leetcode.`, `The UK and Ireland Programming Competition (UKIEPC) is an annual event where students from universities across the UK and Ireland come together to solve challenging algorithmic problems. It's organized by the UKIEPC Committee and serves as a platform for participants to showcase their problem-solving skills and passion for coding through friendly competition.`, <Link to={"/events"} style={hoveredLink === true ? hoverStyle : defaultStyle} onMouseEnter={() => setHoveredLink(true)} onMouseLeave={() => setHoveredLink(false)}>Please check the list of upcoming events here to find out when the next session is</Link>]} />
      <EventWhereWhen location="Meeting rooms, Chichester I" date="Mon 1:00pm" link="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2518.1261731945247!2d-0.08990902304499236!3d50.865863857366044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487588b5f2f211b5%3A0xae77bf312760670c!2sChichester%20I%2C%20Falmer%2C%20Brighton%20BN1%209QJ!5e0!3m2!1sen!2suk!4v1710763477385!5m2!1sen!2suk"/>
    </>
  );
}

export default CompetitiveProgramming;