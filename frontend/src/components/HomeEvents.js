import CodersCup from "../assets/Home/coders-cup.png";
import Gamejam from "../assets/Home/gamejam.png";
import Hackathon from "../assets/Home/hackathon.png";
import Pwnsussex from "../assets/Home/pwnsussex.png";
import React from "react";
import styles from "./HomeEvent.module.css";

const HomeEvents = () => {
  return (
    <div className={`container ${styles.container} mt-5 ms-auto me-auto`}>
      <div className='row m-0'>
        <h2 className='display-4 fw-bold text-light text-center w-75 border-bottom ms-auto me-auto pb-3'>
          Our Events
        </h2>
      </div>
      <div className='row mb-3'>
        <div className='col-12 col-lg-6 m-auto text-lg-end px-3'>
          <h2 className='display-6 fw-bold text-electric'>
            Hackathon
          </h2>
          <p className='fs-4'>
            The biggest Annual Hackathon in Brighton & Hove
          </p>
          <p>
            HackSussex runs a weekend-long hackathon annually on Sussex campus. The hackathon is an event where passionate programmers and designers from all across the country come down to build the best tech inventions and solutions they can in just 24 hours, with many prizes for the winning teams.
          </p>
        </div>
        <div className='col-12 col-lg-6 p-5 m-auto text-center text-lg-start'>
          <img src={Hackathon} alt="hackathon" className='img-fluid rounded event-logo' style={{objectFit: 'contain'}}></img>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-12 col-lg-6 m-auto text-lg-start px-3 order-1 order-lg-2'>
          <h2 className='display-6 fw-bold text-electric'>
            Game Jam
          </h2>
          <p className='fs-4'>
            Our newest event where participants are challenged with designing a game within 24 hours!
          </p>
          <p>
          This year, we are running a brand-new event called the HackSussex Game Jam. Participants will have the opportunity to showcase their skills & innovative ideas in designing and developing games within 24 hours.
          </p>
        </div>
        <div className='col-12 col-lg-6 p-5 m-auto order-2 order-lg-1 text-center text-lg-end'>
          <img src={Gamejam} alt="hackathon" className='img-fluid rounded event-logo' style={{objectFit: 'contain'}}></img>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-12 col-lg-6 m-auto text-lg-end px-3'>
          <h2 className='display-6 fw-bold text-electric'>
            Coders' Cup
          </h2>
          <p className='fs-4'>
            Algorithmic Coding Competition for Students!
          </p>
          <p>
            An annual programming competition where all programmers studying at the University of Sussex compete to answer algorithmic coding puzzles. If you manage to qualify for the finals, you will go toe to toe with other programmers in an 8 player knockout competition, which will be streamed online. There is a prize pool involved for the winners of the competition.
          </p>
        </div>
        <div className='col-12 col-lg-6 p-5 m-auto text-center text-lg-start'>
          <img src={CodersCup} alt="hackathon" className='img-fluid rounded event-logo' style={{objectFit: 'contain'}}></img>
        </div>    
      </div>
      <div className='row mb-3'>
        <div className='col-12 col-lg-6 m-auto text-lg-start px-3 order-1 order-lg-2'>
          <h2 className='display-6 fw-bold text-electric'>
            PwnSussex
          </h2>
          <p className='fs-4'>
            Cybersecruity Puzzles for our HackerSussexers
          </p>
          <p>
            Run by PwnSussex, we also participate in Capture The Flag (CTF) events, where players in a team need to find as many flags as possible, of which are hidden behind cybersecurity challenges in order to score points.
          </p>
        </div>  
        <div className='col-12 col-lg-6 p-5 m-auto order-2 order-lg-1 text-center text-lg-end'>
          <img src={Pwnsussex} alt="hackathon" className='img-fluid rounded event-logo' style={{objectFit: 'contain'}}></img>
        </div>  
      </div>
    </div>
  );
}

export default HomeEvents;
