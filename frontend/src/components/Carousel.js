import CodersCupBackground from "../assets/Events/CodersCup/CodersCupBackground.png";
import CodersCupLogo from "../assets/Events/CodersCup/CodersCupLogo.png";
import CompetitiveCodingBackground from "../assets/Events/CompetitiveProgramming/CompetitiveProgrammingBackground.jpg";
import GameJamBackground from "../assets/Events/GameJam/GJBackground.png";
import GameJamLogo from "../assets/Events/GameJam/GJ25Logo.png";
import HackathonBackground from "../assets/Events/Hackathon/HSBackground.png";
import HackathonLogo from "../assets/Events/Hackathon/HSLogo.png";
import LeetcodingBackground from "../assets/Events/Leetcoding/LeetcodingBackground.png";
import LeetcodingLogo from "../assets/Events/Leetcoding/LeetcodingLogo.png";
import MineSocBackground from "../assets/Events/MineSoc/MineSocBackground.png";
import MineSocLogo from "../assets/Events/MineSoc/MineSocLogo.png";
import PwnSussexBackground from "../assets/Events/PwnSussex/PwnSussexBackground.png";
import PwnSussexLogo from "../assets/Events/PwnSussex/PwnSussexLogo.png";
import React from "react";
import RoboticsBackground from "../assets/Events/Robotics/RoboticsBackground.png";
import { Link } from "react-router-dom";

const HomeCarousel = () => {
  return (
    <div className='container-fluid m-0 p-0'>
      <div className='row'>
        <div className='col p-0'>
          <div id='homeCarousel' className='carousel slide'data-bs-ride="carousel">
            <div className='carousel-inner m-0'>
              {/* HACKATHON CAROUSEL */}
              <Link to="/Events/hackathon" className="p-0">
                <div className="carousel-item active">
                  <img src={HackathonBackground} className="d-block w-100 img-fluid carousel-img" alt='Hackathon background' />
                  <div className="carousel-caption">
                    <div className="row align-items-center">
                      <div className="col-12 col-lg-6">
                        <img src={HackathonLogo} alt="Hackathon Logo" className="img-fluid me-auto ms-auto d-block p-3" />
                        <p className='text-wrap text-start d-none d-lg-block'>
                          📅 March 2026 <br />
                          📍 Chichester building, University of Sussex, UK <br />
                          🌐 In-Person
                        </p>
                      </div>
                      <div className="col-6 d-none d-lg-block">
                        <iframe 
                          className="w-100 rounded" 
                          src="https://www.youtube.com/embed/I0szBuNtyLs?si=zrvUYJ0cMzRRywWV" 
                          style={{ aspectRatio: '16/9', maxWidth: '560px', borderRadius: '15px' }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          title="Hackathon Video"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
                
              {/* END HACKATHON CAROUSEL */}

              {/* GAME JAM CAROUSEL */}
              <Link to="/Events/gamejam" className="p-0">
                <div className="carousel-item">
                  <img src={GameJamBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <div className='row align-items-center h-100'>
                        <div className="col-12 col-lg-6 h-100">
                          <img src={GameJamLogo} alt="Game Jam Logo" className='img-fluid me-auto ms-auto d-block p-3 h-75 object-fit-contain'/>
                          <p className='text-wrap text-start d-none d-lg-block'>
                            📅 6th-7th December 2025<br />
                            📍 Chichester building, University of Sussex, UK<br />
                            🌐 In-Person
                          </p>
                        </div>
                        <div className='col-lg-6 d-none d-lg-block'>
                          <h1 className='fw-bold display-4 text-electric'>Game Jam Event Loading...</h1>
                          <div className='mt-3'>
                            <div className="progress" style={{ height: '30px', borderRadius: '15px', backgroundColor: '#222' }}>
                              <div className="progress-barprogress-bar-animated bg-success" role="progressbar" style={{ width: '85%' }} aria-label="progress bar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className='text-center mt-2 text-light display-6'>85%</div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
              {/* END GAME JAM  CAROUSEL */}

              {/* CODERS CUP CAROUSEL */}
              <Link to="/Events/coderscup" className="p-0">
                <div className="carousel-item">
                  <img src={CodersCupBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                      <div className="row align-items-center">
                        <div className="col-12 col-lg-6">
                          <img src={CodersCupLogo} alt="Coders' Cup Logo" className="img-fluid me-auto ms-auto d-block p-3 pb-0" />
                          <h1 className='fw-bold display-4 text-electric d-none d-lg-block'>Coders' Cup</h1>
                          <p className='text-wrap text-start d-none d-lg-block'>
                            📅 May 2026<br />
                            📍 Live on Youtube<br />
                            🌐 Online
                          </p>
                        </div>
                        
                        <div className="col-6 d-none d-lg-block">
                          <iframe 
                            className="w-100 rounded" 
                            src="https://www.youtube.com/embed/VixYfv0UEyE?si=_31x_WjbbMnXkbyM" 
                            style={{ aspectRatio: '16/9', maxWidth: '560px', borderRadius: '15px' }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            title="Coders' cup video"
                          ></iframe>
                        </div>
                      </div>
                  </div>
                </div>
              </Link>
              {/* END CODERS CUP CAROUSEL */}

              {/* PwnSussex CAROUSEL */}
              <Link to="/Events/pwnsussex" className="p-0">
                <div className="carousel-item h-100">
                  <img src={PwnSussexBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <img src={PwnSussexLogo} alt="PwnSussex Logo" className='img-fluid ms-auto me-auto d-block p-3' />
                  </div>
                </div>
              </Link>
              {/* END PwnSussex CAROUSEL */}

              {/* LEETCODING CAROUSEL */}
              <Link to="/Events/leetcoding" className="p-0">
                <div className="carousel-item">
                  <img src={LeetcodingBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <img src={LeetcodingLogo} alt="Leetcoding Logo" className='img-fluid ms-auto me-auto d-block p-3' style={{ width: '60%', height: 'auto' }} />
                  </div>
                </div>
              </Link>
              {/* END LEETCODING CAROUSEL */}

              {/* ROBOTICS CAROUSEL */}
              <Link to="/Events/leetcoding" className="p-0">
                <div className="carousel-item">
                  <img src={RoboticsBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <h1 className='text-light text-center'>Robotics</h1>
                  </div>
                </div>
              </Link>
              {/* END ROBOTICS CAROUSEL */}

              {/* COMPETITIVE PROGRAMMING CAROUSEL */}
              <Link to="/Events/leetcoding" className="p-0">
                <div className="carousel-item">
                  <img src={CompetitiveCodingBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <h1 className='text-light text-center'>Competitive Programming</h1>
                  </div>
                </div>
              </Link>
              {/* END COMPETITIVE PROGRAMMING CAROUSEL */}

              {/* MineSoc CAROUSEL */}
              <Link to="/Events/leetcoding" className="p-0">
                <div className="carousel-item">
                  <img src={MineSocBackground} className="d-block w-100 h-100 img-fluid carousel-img" alt='Background' />
                  <div className="carousel-caption">
                    <img src={MineSocLogo} alt="MineSoc Logo" className='img-fluid ms-auto me-auto d-block p-3' style={{ width: '40%', height: 'auto' }} />
                  </div>
                </div>
              </Link>
              {/* END MineSoc CAROUSEL */}

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
  </div>

  );
}

export default HomeCarousel;
