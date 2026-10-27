import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import Events from '../../events.js';

function dateFormat(date) {
  let dateObj = new Date(date);
  let month = dateObj.toLocaleString('default', { month: 'long' });
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return day + " " + month + " " + year;
}

const PastEvents = () => {
  let date = new Date();
  let past = [];
  let upcoming = [];

  Events.forEach((event) => {
    let eventDate = new Date(event.date);
    let eventTime = new Date(event.date).getTime();
    if (event.repeating) {
      let time = eventDate.getTime();
      while (time < new Date().getTime()) {
        time += (1000*60*60*24*7);
      }
      eventTime = time;
      eventDate = new Date(time);
    }
    event.date = eventDate
    if (eventTime >= date.getTime()) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  past.sort((a, b) => new Date(b.date) - new Date(a.date));
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <div className="container-fluid mb-3 p-3">
        <h2 className="text-center display-6 border-bottom w-75 me-auto ms-auto pb-3">Upcoming Events</h2>
        <div className="container align-items-center events">
          <div className="row align-items-start">
            {upcoming.map((event, index) => (
              <div className="col-12 col-md-6 col-lg-4 my-3">
                <div className="card">
                  <img src={event.image} className="card-img-top event-img" alt="..." />
                  <div className="card-body">
                    <h2 className="card-title text-center display-5 mb-2">
                      {event.title}
                    </h2>
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
                    {/* <Link to={"/Events/" + event.date + "/" + event.title} className="btn btn-blue">View Event</Link> -- this throws errors so it's commented out until someone with more brain power can resovlve the issue */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container-fluid mb-3 p-3">
        <h2 className="text-center display-6 border-bottom w-75 me-auto ms-auto pb-3">Past Events</h2>
        <div className="container align-items-center events">
          <div className="row align-items-start">
            {past.map((event, index) => (
              <div className="col-12 col-md-6 col-lg-4 my-3">
                {event.date !== null &&
                  <div className="card">
                    <img src={event.image} className="card-img-top event-img" alt="..." />
                    <div className="card-body">
                      <h2 className="card-title text-center display-5 mb-2">
                        {event.title}
                      </h2>
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
                      {/* <Link to={"/Events/" + event.date + "/" + event.title} className="btn btn-blue">View Event</Link> <-- This throws an error*/}
                    </div>
                  </div>
                }
                {event.date === null &&
                  <div className="card">
                  <img src={event.image} className="card-img-top event-img" alt="..." />
                  <div className="card-body">
                    <h2 className="card-title text-center display-5 mb-2">
                      {event.title}
                    </h2>
                    <p className="card-text">
                      <span className='me-2'>
                        <FaCalendarAlt />
                      </span>
                      Other
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
                    <Link to={"/Events/" + event.date + "/" + event.title} className="btn btn-blue disabled">View Event</Link>
                  </div>
                </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default PastEvents;