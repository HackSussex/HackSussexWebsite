import React from 'react';
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter, FaYoutube, FaTiktok } from 'react-icons/fa';

const SocialMediaBanner = () => {

  function openLink(url) {
    window.open(url, '_blank');
  }

  return (
    <>
      <div className="container-fluid social-media-banner p-3 text-center gradient">
        <div className="row text-center">
          <h2 className="col-12 text-dark">Find us on Social Media</h2>
        </div>
        <div className="row justify-content-center p-2">
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://discord.gg/Uwsbxy8Bqf')}>
              <FaDiscord className="social-icon discord-icon display-1 mobile-big" />
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://www.instagram.com/hacksussex')}>
              <FaInstagram className="social-icon instagram-icon display-1 mobile-big" />
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://twitter.com/HackSussex')}>
              <FaTwitter className="social-icon twitter-icon display-1 mobile-big" />
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://uk.linkedin.com/company/hacksussex')}>
              <FaLinkedin className="social-icon linkedin-icon display-1 mobile-big" />
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://www.youtube.com/@HackSussex')}>
              <FaYoutube className="social-icon youtube-icon display-1 mobile-big" />
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1 mb-3 mb-lg-0">
            <button className="btn p-0 icon-button" onClick={() => openLink('https://www.tiktok.com/@hacksussex')}>
              <FaTiktok className="social-icon tiktok-icon display-1 mobile-big" />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .social-icon {
          color: var(--dark-grey);
          transition: color 0.5s;
        }
        .discord-icon:hover,
        .twitter-icon:hover,
        .instagram-icon:hover,
        .linkedin-icon:hover,
        .youtube-icon:hover,
        .tiktok-icon:hover {
          color: #fff;
        }
        @media (max-width: 768px) {
          .mobile-big {
            font-size: 5rem;
          }
        }
      `}</style>
    </>
  )
}

export default SocialMediaBanner;
