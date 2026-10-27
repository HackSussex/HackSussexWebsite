import React, { useEffect } from 'react';
import { useState } from 'react'

const Timer = (props) => {

    const [days, setDays ] = useState(0)
    const [hours, setHours ] = useState(0)
    const [minutes, setMinutes ] = useState(0)
    const [seconds, setSeconds ] = useState(0)
    const [loading, setLoading] = useState(true)
  
    const deadline = new Date(props.date).getTime();
  
    const getTime = () => {
      const time = deadline - new Date().getTime();
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((time % (1000 * 60)) / 1000));
      setLoading(false)
    }
  
    useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);

    // if time has reached 0, don't go negative
    if (days < 0) {
        setDays(0)
    }
    if (hours < 0) {
        setHours(0)
    }
    if (minutes < 0) {
        setMinutes(0)
    }
    if (seconds < 0) {
        setSeconds(0)
    }

    return (
        <>
            <div className='container-fluid text-center p-3' style={{backgroundColor: "var(--darker-blue)"}}>
            {loading ? (
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                ) : (
                    <>
                        <h1 id="headline">Countdown to the {props.title}</h1>
                        <div className='row justify-content-center text-center'>
                            <div className='col-auto'>
                                <div className='row justify-content-center text-green'>
                                    <div className='col'>
                                        <h2 className='lead display-6'>{days}</h2>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col'>
                                        <h3 className='fw-bold text-electric'>DAYS</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div className='row justify-content-center text-green'>
                                    <div className='col'>
                                        <h2 className='lead display-6'>{hours}</h2>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col'>
                                        <h3 className='fw-bold text-electric'>HOURS</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div className='row justify-content-center text-green'>
                                    <div className='col'>
                                        <h2 className='lead display-6'>{minutes}</h2>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col'>
                                        <h3 className='fw-bold text-electric'>MINUTES</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-auto'>
                                <div className='row justify-content-center text-green'>
                                    <div className='col'>
                                        <h2 className='lead display-6'>{seconds}</h2>
                                    </div>
                                </div>
                                <div className='row justify-content-center'>
                                    <div className='col'>
                                        <h3 className='fw-bold text-electric'>SECONDS</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Timer;