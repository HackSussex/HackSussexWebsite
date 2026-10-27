import React, { useState } from "react";
import logo from "../assets/Logos/Gradient.png";
import { Link, Outlet } from "react-router-dom";

const Navbar = (props) => {
  const [navbar, setNavbar] = useState(false)

  const toggleNavbar = () => {
    setNavbar(!navbar)
  }

  const closeNavbar = () => {
    setNavbar(false)
  }

  return(
    <>   
      <nav class="navbar navbar-expand-xl navbar-dark p-0 navbar-blur">
        <div className="container-fluid py-2 px-5">

          {/* MLH Flag */}
          <a 
            id="mlh-trust-badge" 
            className="d-none d-lg-block"
            style={{display: 'block', maxWidth: '100px', minWidth: '60px', position: 'fixed', right: '100px', top: '0', width: '10%', zIndex: 10000}} 
            href="https://mlh.io/eu?utm_source=eu-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg" 
              alt="Major League Hacking 2026 Hackathon Season" 
              style={{width: '100%'}} 
            />
          </a>
          {/* End MLH Flag */}

          <Link class="navbar-brand" to="/" onClick={closeNavbar}>
            <img src={logo} alt="logo" width="100" height="50" />
          </Link>
          <button class={`navbar-toggler btn rounded ${navbar ? 'collapsed' : ''}`} type="button" onClick={toggleNavbar} aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>   
          <div className={`collapse navbar-collapse ${navbar ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link px-4" to="/about" onClick={closeNavbar}>
                  About
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle px-4" to="#" id="navbarEventDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Events
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarEventDropdown">
                  <li>
                    <Link className="dropdown-item" to="/Events/hackathon" onClick={closeNavbar}>
                      Hackathon
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/coderscup" onClick={closeNavbar}>
                      Coders' Cup
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="/Events/codesocials" onClick={closeNavbar}>
                      Code Socials
                    </Link>
                  </li> */}
                  <li>
                    <Link className="dropdown-item" to="/Events/pwnsussex" onClick={closeNavbar}>
                      PwnSussex
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/gamejam" onClick={closeNavbar}>
                      Game Jam
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/leetcoding" onClick={closeNavbar}>
                      Leetcoding
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/robotics" onClick={closeNavbar}>
                      Robotics
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/competitiveProgramming" onClick={closeNavbar}>
                      Competitive Programming
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Events/MineSoc" onClick={closeNavbar}>
                      MineSoc
                    </Link>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li>
                    <Link className="dropdown-item" to="/events" onClick={closeNavbar}>
                      All Events
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/gallery" onClick={closeNavbar}>
                  Gallery
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/sponsorship" onClick={closeNavbar}>
                  Sponsors
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="/faq" onClick={closeNavbar}>
                  FAQ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-4" to="https://hacksussex.square.site/" target="_blank" onClick={closeNavbar}>
                  Merch Store
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default Navbar;