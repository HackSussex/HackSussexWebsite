import AboutSection from "../../components/AboutSection";
import BCS from "../../assets/SponsorLogos/BCS.png";
import CodesOfConduct from "../../components/CodesOfConduct";
import EventWhereWhen from "../../components/EventWhereWhen";
import GameJamBackground from "../../assets/Events/GameJam/GJBackground.png";
import GameJamLogo from "../../assets/Events/GameJam/GJ25Logo.png";
import HUK from "../../assets/SponsorLogos/huk.png";
import MLH from "../../assets/SponsorLogos/Mlh-logo.png";
import Schedule from "../../components/Schedule";
import Sponsors from "../../components/Sponsors";
import TicketSection from "../../components/TicketSection";
import Timer from "../../components/Timer";
import UOS from "../../assets/SponsorLogos/UoS.png";
import { React, useEffect } from "react";

const config = {
  "timer": false,
  "event": false,
  "schedule": false,
  "sponsors": false,
  "date": "Dec 6, 2025, 10:00:00",
  "title": "2025 Game Jam",
  "tickets": false,
  "url": "https://tickets.hacksussex.com/GameJam2025/"
}

var schedule = {
  1: [
    {
      time: "10:00",
      event: "Registration Opens",
      location: "Chichester 1",
    },
    {
      time: "11:00",
      event: "Opening Ceremony",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "12:00",
      event: "Hacking Begins",
      location: "Chichester 1 Labs",
    },
    {
      time: "12:30",
      event: "Lunch - TunTuns",
      location: "Chichester 1",
    },
    {
      time: "14:00",
      event: "MLH Gemini Workshop",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "15:30",
      event: "MLH Copilot Workshop",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "17:00",
      event: "Cupstacking Competition",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "18:00",
      event: "Dinner - PizzaMe",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "21:00",
      event: "Minecraft Hunger Games",
      location: "Chichester 1",
    }
  ],
  2:[
    {
      time: "1:00",
      event: "Movie & Popcorn",
      location: "Chichester 1",
    },
    {
      time: "8:30",
      event: "Breakfast - Pastries",
      location: "Chichester 1 Lecture Theatre",
    },
    {
      time: "11:00",
      event: "Soft Deadline",
      location: "Breakfast",
    },
    {
      time: "12:00",
      event: "Hacking Ends",
      location: "Breakfast",
    },
    {
      time: "12:00",
      event: "Lunch - CaPhe Republic",
      location: "Chichester 1",
    },
    {
      time: "13:00",
      event: "Judging Period",
      location: "Chichester 1",
    },
    {
      time: "16:00PM",
      event: "Closing Ceremony",
      location: "Chichester 1",
    }
  ]
}

const sponsorData = [
  {name : "HUK", img: HUK, url: "https://www.hackathons.org.uk/"},
  {name : "BCS", img: BCS, url: "https://www.bcs.org/"},
  {name : "UoS", img: UOS, url: "https://www.sussex.ac.uk/"},
  {name : "MLH", img: MLH, url: "https://mlh.io/"},
];

const codes = [
  { name: "MLH", url: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" }
]


const GameJam = () => {
  useEffect(() => {
    document.body.classList.add("gamejam-body");

    return () => {
      document.body.classList.remove("gamejam-body");
    };
  }, []);

  return (
    <>
    <div className="gamejam">
      <div className="carousel-inner p-0">
        <img src={GameJamBackground} className="d-block w-100 h-100 img-fluid splash" alt='Background' />
        <div className="carousel-caption">
          <div className='row align-items-center h-100'>
              <div className="h-100">
                <img src={GameJamLogo} alt="Game Jam Logo" className="img-fluid d-block mx-auto h-100 object-fit-cover" />
                {/* <p className='text-wrap text-start d-none d-lg-block'>
                  📅 December 2025<br />
                  📍 Chichester building, University of Sussex, UK<br />
                  🌐 In-Person
                </p> */}
              </div>
              {/* <div className='col-lg-6 d-none d-lg-block'>
                <h1 className='fw-bold display-4 text-electric'>Game Jam Event Loading...</h1>
                <div className='mt-3'>
                  <div className="progress" style={{ height: '30px', borderRadius: '15px', backgroundColor: '#222' }}>
                    <div className="progress-barprogress-bar-animated bg-success" role="progressbar" style={{ width: '100%' }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" aria-label='progress bar'></div>
                  </div>
                  <div className='text-center mt-2 text-light display-6'>100%</div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
      {config.tickets && <TicketSection url={config.url} />}
      {config.timer && <Timer date={config.date} title={config.title} />}
      <AboutSection description={<>
                    <p>
                    The Game Jam is back! Collaborating with many of the local studios surrounding Brighton to focus 
                    in on our Game Development and Design enthusiasts. Much like a hackathon, teams will be tasked with building a project to 
                    compete in tracks to inspire game design and win prizes.If you are looking for an opportunity to collaborate with others and 
                    experience trial and error throughout the game development process, this event would be a good match for you. Also, it will 
                    be great for those who are looking for a place to have exploration of new technologies in the realm of game development. The 
                    event is entirely free and paid for by our lovely sponsors. HackSussex GameJam 2025 is run in accordance with the <a href="https://static.mlh.io/docs/org-code-of-conduct.pdf" target="_blank" rel="noopener noreferrer">MLH Code of Conduct</a>.
                    </p>
                    </>}
                    list={["24 Hours of project building", "Win exciting prizes", "Free swag", "Free Food and Drinks", "Workshops to learn skills"]} />
      {config.event && <EventWhereWhen location="University of Sussex, Brighton" date={config.date} link={null} /> }
      {config.schedule && <Schedule schedule={schedule} multi_day={true} />}
      {config.sponsors && <Sponsors sponsorData={sponsorData} />}
      {config.event && <CodesOfConduct links={codes} /> }
    </div>
    </>
  );
}

export default GameJam;