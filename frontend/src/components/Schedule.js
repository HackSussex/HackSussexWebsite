import React, { useState } from "react"

const Schedule = (props) => {
  const schedule = props.schedule
  const multi_day = props.multi_day

  const days = Object.keys(schedule).length
  
  const [activeDay, setActiveDay] = useState(1)

  const changeDay = (day) => {
    setActiveDay(day)
  }

  return (
    <>
      <div className="p-3 text-center">
        <h1 className="display-3">Schedule</h1>
      </div>
      {/* days buttons */}
      {multi_day && <div className="container-fluid p-3 text-center justify-content-center">
        {Array.from(Array(days).keys()).map((day, index) => {
          return (
            <button className={`btn schedule mx-2 fs-3 ${activeDay === index+1 ? 'active' : ''}`} onClick={() => changeDay(index+1)}>Day {index+1}</button>
          )
        })}
      </div>}
      {/* schedule */}
      <div className="container-fluid p-3 mb-5" id="schedule">
        <div className="row">
          <div className="col-6 text-end">
            {schedule[activeDay].map((event, index) => {
              if (index % 2 === 0) {
                return (
                  <>
                    <div className="container p-3">
                      <div className="row display-5 fw-bold">
                        <span>{event.time}</span>
                      </div>
                      <div className="row fs-2">
                        <span className="circle-left" />
                        <span>{event.event}</span>
                      </div>
                      <div className="row">
                        <em>{event.location}</em>
                      </div>
                    </div>
                  </>      
                )
              } else {
                return (
                  <>
                    <div className="container invisible p-3">
                      <div className="row display-5 fw-bold">
                        <span>{event.time}</span>
                      </div>
                      <div className="row fs-2">
                        <span>{event.event}</span>
                      </div>
                      <div className="row">
                        <em>{event.location}</em>
                      </div>
                    </div>
                  </>      
                )
              }
            })}
          </div>
          <div className="col-auto p-0">
            {/* vertical line all the way down the container */}
            <div className="vertical-line">
            </div>
          </div>
          <div className="col-6 text-start">
            {schedule[activeDay].map((event, index) => {
              if (index % 2 === 1) {
                return (
                  <>
                    <div className="container p-3">
                      <div className="row display-5 fw-bold">
                        <span>{event.time}</span>
                      </div>
                      <div className="row fs-2">
                        <span className="circle-right" />
                        <span>{event.event}</span>
                      </div>
                      <div className="row">
                        <em>{event.location}</em>
                      </div>
                    </div>
                  </>     
                )
              } else {
                return (
                  <>
                    <div className="container invisible p-3">
                      <div className="row display-5 fw-bold">
                        <span>{event.time}</span>
                      </div>
                      <div className="row fs-2">
                        <span>{event.event}</span>
                      </div>
                      <div className="row">
                        <em>{event.location}</em>
                      </div>
                    </div>
                  </>      
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Schedule