import React from "react";
import events from "../events.js";
import { FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function dateFormat(date) {
  let dateObj = new Date(date);
  let month = dateObj.toLocaleString('default', { month: 'long' });
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return day + " " + month + " " + year;
}

const UpcomingEvents = () => {
  let date = new Date();
  let upcoming = [];

  events.forEach((event) => {
    let eventDate = new Date(event.date);
    if (eventDate > date) {
      upcoming.push(event);
    }
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  upcoming = upcoming.slice(0, 3);

  return (
    <div className="container-fluid mb-5 p-3 gradient">
      <div>
        <h1 className="text-center mb-5 text-dark fw-bold display-4 border-bottom w-75 ms-auto me-auto pb-3 mt-2">Upcoming Events</h1>
      </div>
      <div className="container align-items-center events">
        <div className="row align-items-start">
          {upcoming.map((event, index) => (
            <div className="col-12 col-md-6 col-lg-4 my-3 ms-auto me-auto">
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
                  <Link to={"/Events/" + event.date + '/' + event.title} className="btn btn-blue">View Event</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            type="button" 
            className={`btn btn-blue btn-lg col-auto mt-3 mb-1`} 
            to="/events"
          >
            <strong>
              View More
              <FaArrowRight className="ms-3" />
            </strong>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UpcomingEvents;
