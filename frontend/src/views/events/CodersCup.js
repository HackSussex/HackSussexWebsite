import AboutSection from "../../components/AboutSection";
import CodersCupBackground from "../../assets/Events/CodersCup/CodersCupBackground.png";
import CodersCupLogo from "../../assets/Events/CodersCup/CodersCupLogo.png";
import EventWhereWhen from "../../components/EventWhereWhen";
import HallOfFame from "../../components/HallOfFame";
import React, { useState } from "react";
import Schedule from "../../components/Schedule";
import Sponsors from "../../components/Sponsors";
import Timer from "../../components/Timer";
import guy from "../../assets/Events/CodersCup/winners/guy.png";
import jude from "../../assets/Events/CodersCup/winners/jude.png";
import layton from "../../assets/Events/CodersCup/winners/layton.jpg";
import patrick from "../../assets/Events/CodersCup/winners/patrick.png";
import { Link } from "react-router-dom";

const hallOfFameData = [
  {
    imageUrl: layton,
    title: "Layton",
    subheading: "2024 winner and beater of last years' winner Patrick in a bonus round",
    paragraph: "A final year CS student and champion who proved his worth in this years competition. Layton can commonly be found due to his big orange hair and height of 6'2. When not being super friendly, Layton can be found working on coursework and helping other students with their assignments."
  },
  {
    imageUrl: patrick,
    title: "Patrick",
    subheading: "Pizza Box Patrick",
    paragraph: "A foundation year student showing all the masters that C++ will never be beaten by python. Came to Sussex so he could quit his job as a welder and hang around in a swivel chair drinking tea. Now a Hack Sussex committee member making clothing for poor impoverished robots. Can not resist obsolete apple tech in pawn shops."
  },
  {
    imageUrl: guy,
    title: "Guy",
    subheading: "Who has two thumbs and loves to code?",
    paragraph: "The early parts of Guy's life cycle involved burrowing into Wikipedia and the school library and producing code that went on floppy disks. He eventually metamorphosed into a semi-competent adult, taught maths to schoolkids who he remembers fondly, decided on a change of career, and came to Sussex to learn programming in a more structured way.\n\nStrengths: python, philosophy, using the microwave\nWeaknesses: cameras, large pebbles"
  },
  {
    imageUrl: jude,
    title: "Jude",
    subheading: "Mr Yeet Man",
    paragraph: "A CS student who's composed of 50% vanilla bubble tea. He started making games with Scratch 10 years ago and now wields the power of Unity, peaking in his game dev career with Yeet Man (https://jkit.itch.io/yeet-man). After completing a study abroad year in Japan, he's now a HackSussex committee member during his final year.\n\nInterests:\n• Piano\n• Tennis\n• Joe Hisaishi"
  }
];

const config = {
  "timer": true,
  "event": false,
  "schedule": false,
  "sponsors": false,
  "open": true,
  "date": "8th May, 2026",
  "title": "Coders' Cup 2026",
}

var schedule = {
  1: [
    {
      time: "3rd April",
      event: "Qualifications Open",
      location: "HackerRank",
    },
    {
      time: "11th April",
      event: "Qualifications Close",
      location: "HackerRank",
    },
    {
      time: "17th Apriil",
      event: "Final",
      location: "Online",
    }
  ],
}

const sponsorData = [
  {
    title: "Title Sponsor",
    size: "80%",
    logos: [CodersCupLogo]
  },
  {
    title: "Gold Sponsors",
    size: "40%",
    logos: [CodersCupLogo, CodersCupLogo]
  },
  {
    title: "Silver Sponsors",
    size: "30%",
    logos: [CodersCupLogo, CodersCupLogo, CodersCupLogo]
  },
  {
    title: "Bronze Sponsors",
    size: "20%",
    logos: [CodersCupLogo, CodersCupLogo, CodersCupLogo, CodersCupLogo]
  },
  {
    title: "Partners",
    size: "20%",
    logos: [CodersCupLogo, CodersCupLogo, CodersCupLogo, CodersCupLogo]
  },
];

const CodersCup = () => {

  const [hoveredLink, setHoveredLink] = useState(false);

  const defaultStyle = {
      textDecoration: "none",
      backgroundColor: "var(--green)",
      color: "white"
  };

  const hoverStyle = {
      textDecoration: "none",
      backgroundColor: "var(--lime)",
      color: "white"
  };

  return (
    <>
      <div className="carousel-inner p-0">
      <img src={CodersCupBackground} className="d-block w-100 h-100 img-fluid splash" alt='Background' />
        <div className="carousel-caption">
            <div className="row align-items-center">
              <div className="col-12 col-lg-6">
                <img src={CodersCupLogo} alt="Coders' Cup Logo" className="img-fluid me-auto ms-auto d-block p-5 pb-1" />
                <h1 className='fw-bold display-4 text-electric d-none d-lg-block'>Coders' Cup</h1>
              </div>
              <div className="col-6 d-none d-lg-block">
                <iframe 
                  className="w-100 rounded" 
                  src="https://www.youtube.com/embed/VixYfv0UEyE?si=e42MsxP4N-bxhGQe" 
                  style={{ aspectRatio: '16/9', maxWidth: '560px', borderRadius: '15px' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  title="Coders' cup video"
                ></iframe>
              </div>
            </div>
        </div>
      </div>
 {config.open && <div className='container-fluid d-flex justify-content-center mt-3'> {/* Awaiting lik to competition */}
      <Link className='rounded text-center display-4 p-3' to={"https://docs.google.com/forms/d/e/1FAIpQLSfv854bsplBWjSA5_e38_e3tMNgGvRQQEqPb8W0NnCJ9l54JA/viewform?usp=header"} target={"_blank"} style={hoveredLink === true ? hoverStyle : defaultStyle} onMouseEnter={() => setHoveredLink(true)} onMouseLeave={() => setHoveredLink(false)}>Register to enter</Link>
    </div>}
      {/* {config.timer && <Timer date={config.date} title={config.title} />} */}
      <AboutSection description={[`Join us once again for our annual programming competition, the Coders' Cup! Livestreamed from the campus studio we bring you a number of experienced seriosu programmers battling each other to see who is the best competitive programmer that sussex can offer.`, `Want to come watch for yourself? This event will be livestreamed on our youtube channel.`, ]}/>
      <EventWhereWhen location="University of Sussex, Brighton" date={config.timer === true ? config.date : null} link={null} />
      {config.schedule && <Schedule schedule={schedule} multi_day={false} />}
      {config.sponsors && <Sponsors sponsorData={sponsorData}/>}
      <HallOfFame data={hallOfFameData} />
    </>
  );
}

export default CodersCup;