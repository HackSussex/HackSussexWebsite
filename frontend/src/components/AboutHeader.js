import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutHeader.module.css';

import hackathonLogo from '../assets/Logos/Gradient.png';

const AboutHeader = () => {
  return (
    <>
      <div className='container py-2 px-3'>
        <div className='row align-items-center px-4 py-4 text-center'>
          <div className={`col-12 col-md-8 offset-md-2 ${styles.contentCol}`}>
            <h2 className='lead fs-4 mb-3 text-uppercase'>The Home of Informatics at the</h2>
            <h1 className='mb-3 fs-1 text-uppercase fw-bold'>University of Sussex</h1>

            <img 
              src={hackathonLogo}
              alt='University of Sussex Logo' 
              className={`${styles.logoImage} mb-4`}
            />

            <div className='row justify-content-center mb-3 gap-3'>
              <Link 
                type="button" 
                className={`btn btn-blue btn-lg col-auto ${styles.largeButton}`} 
                to='/about'
              >
                About
              </Link>
              <Link 
                type="button" 
                className={`btn btn-blue btn-lg col-auto ${styles.largeButton}`} 
                to='/signup'
              >
                Sign Up
              </Link>
              <Link 
                type="button" 
                className={`btn btn-blue btn-lg col-auto ${styles.largeButton}`} 
                to='/gallery'
              >
                Gallery
              </Link>
            </div>
          </div>
        </div>        
      </div>
    </>
  );
}

export default AboutHeader;