import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const hackSussexStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold'
  };

  return (
    <footer className="bg-dark text-light py-3">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-12 col-md-4 text-center text-md-left mb-3 mb-md-0" style={hackSussexStyle}>
            HackSussex 2026 ©
          </div>
          <div className="col-12 col-md-6 offset-md-2 text-center text-md-right">
            <Link to="/" className="text-light mx-2 footer-link">Home</Link>
            <Link to="/about" className="text-light mx-2 footer-link">About</Link>
            <Link to="/sponsorship" className="text-light mx-2 footer-link">Sponsors</Link>
            <Link to="/gallery" className="text-light mx-2 footer-link">Gallery</Link>
            <Link to="/faq" className='text-light mx-2 footer-link'>FAQ</Link>
          </div>
        </div>
      </div>
      <style jsx>{`
        .footer-link {
          text-decoration: none;
          transition: color 0.3s;
        }
        .footer-link:hover {
          color: #FF0000;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
