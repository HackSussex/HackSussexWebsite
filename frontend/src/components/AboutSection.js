import React from "react";
import { Link } from "react-router-dom";

const AboutSection = (props) => {
    return (
        <>
            <div className='container p-5 pt-3'>
                <div className='row'>
                    <h2 className='display-4 fw-bold mt-3 w-75'>About</h2>
                </div>
                <div className='row mt-0'>
                    {props.list !== undefined &&
                        <>
                            <div class="col-12 col-lg-8">
                                {props.description}
                            </div>
                            <div className="col-12 col-lg-4 mb-3">
                                {(props.list).map((item, index) => (
                                    <div className="row">
                                        <div className="col-1">
                                            ✅
                                        </div>
                                        <div className="col-11">
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    }
                    {!props.list &&
                        <>
                            {props.description.map((text) => (
                                <div class="col-12 mb-3">
                                    {text}
                                </div>
                            ))}
                        </>
                    }
                </div>
                {/* <div className='row'>
                    <div className='col-auto p-2'>
                        <Link type='button' className='btn btn-blue btn-lg' to="/event/hackathon/register">Register</Link>
                    </div>
                    <div className='col-auto p-2'>
                        <Link type='button' className='btn btn-blue btn-lg' to="/event/hackathon/register">FAQ</Link>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AboutSection;