import React from 'react';

import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

import styles from './EventWhereWhen.module.css';

const EventWhereWhen = (props) => {

  let date
  let location
  let link

  if (props.date === null) {
    date = "TBD"
  }
  else {
    date = props.date
  }

  if (props.location === null) {
    location = "TBD"
  }
  else {
    location = props.location
  }

  if (props.link === null) {
    link = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5036.0026193352405!2d-0.0830064!3d50.8681755!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487589b282984cd1%3A0xc03298cc1ca33ee1!2sHackSussex!5e0!3m2!1sen!2suk!4v1694815748321!5m2!1sen!2suk"
  } else {
    link = props.link
  }
  return (
    <div className={`${styles['container-fluid']} gradient py-4`}>
      <div className="container">
        <div className="row align-items-center">

          {/* Leftmost Column */}
          <div className="col-md-4">
            <div className="row align-items-center justify-contents-center">
              <div className="col-auto text-center">
                <FaClock className={styles['icon']} />
              </div>
              <div className="col-9 col-md-7">
                <h3 className={styles['header']}>When</h3>
                <p className={styles['text']}>{date}</p>
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="col-md-4">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto text-center">
                <FaMapMarkerAlt className={styles['icon']} />
              </div>
              <div className="col-9 col-md-7">
                <h3 className={styles['header']}>Where</h3>
                <p className={styles['text']}>{location}</p>
              </div>
            </div>
          </div>

          {/* Rightmost Column with Google Map */}
          <div className="col-md-4">
            <iframe 
              title="Event Location" 
              src={link}
              className={styles['map']}
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventWhereWhen;
