import React from 'react';
import arrow from './../assets/Arrow 2.png';
import BCS from './../assets/SponsorLogos/BCS.png';
import EDF from './../assets/SponsorLogos/EDF.png';
import ElectricSquare from './../assets/SponsorLogos/ElectricSquare.png';
import GitHub from './../assets/SponsorLogos/GitHub.png';
import Overleaf from './../assets/SponsorLogos/Overleaf.png';

const SponsorBanner = () => {
    return(
        <>
            <div className='container-fluid' alt="sponsor logo">
                <div className="row d-none d-lg-block">
                    <div className='container-fluid p-2' style={{backgroundColor: "var(--darker-blue)"}}>
                        <div className='row justify-content-md-center p-2'>
                            <div className='col'>
                                <img src={arrow} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col'>
                                <h3 className='text-center'>Past Sponsors</h3>
                            </div>
                            <div className='col'>
                                <img src={arrow} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                        </div>
                        <div className='row justify-content-md-center p-4'>
                            <div className='col text-center'>
                                <img src={EDF} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={ElectricSquare} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={Overleaf} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={GitHub} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={BCS} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row d-block d-lg-none">
                    <div className='container-fluid p-2' style={{backgroundColor: "var(--darker-blue)"}}>
                        <div className='row justify-content-md-center p-2'>
                            <div className='col-lg-auto'>
                                <h3 className='text-center'>Past Sponsors</h3>
                            </div>
                        </div>
                        <div className='row justify-content-md-center p-4'>
                            <div className='col text-center'>
                                <img src={EDF} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={ElectricSquare} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={Overleaf} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={GitHub} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                            <div className='col text-center'>
                                <img src={BCS} className='img-fluid' alt="sponsor logo"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }
  
  export default SponsorBanner;