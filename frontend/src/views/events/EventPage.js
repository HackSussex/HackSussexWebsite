import React from "react";
import { useParams } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaPoundSign } from 'react-icons/fa';

import events from '../../events.js';

function dateFormat(date) {
  let dateObj = new Date(date);
  let month = dateObj.toLocaleString('default', { month: 'long' });
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return day + " " + month + " " + year;
}

const EventPage = () => {

  let date = useParams().date;
  let title = useParams().title;

  let event = events.find((event) => {
    return event.date === date && event.title === title;
  });

  return (
    <div className="container mb-5 p-3">
      <div className="card">
        <div className="card-body row">
          <div className="col-12 col-sm-6 mb-3">
            <h2 className="card-title display-5 mb-2">
              {event.title}
            </h2>
            <p className="card-text">
              {event.description}
            </p>
          </div>
          <div className="col-12 col-sm-6">
            <div className="ratio ratio-16x9 mb-3">
              <img src={event.image} className="img-fluid rounded" alt="..." />
            </div>
            <p className="card-text">
              <span className='me-2'>
                <FaCalendarAlt />
              </span>
              {dateFormat(event.date)}
            </p>
            <p className="card-text">
              <span className='me-2'>
                <FaClock />
              </span>
              {event.time}
            </p>
            <p className="card-text">
              <span className='me-2'>
                <FaMapMarkerAlt />
              </span>
              {event.location}
            </p>
            <p className="card-text">
              <span className='me-2'>
                <FaPoundSign />
              </span>
              {event.cost}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPage;