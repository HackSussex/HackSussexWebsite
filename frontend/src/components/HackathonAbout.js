import React, { useState } from 'react';

import AboutSection from './AboutSection';

const HackathonAbout = () => {
    const config = {
        "video": true,
    }
    const styles = {
        "pcVideo": { aspectRatio: '16/9', maxWidth: '50%', borderRadius: '15px' },
        "mobileVideo": { aspectRatio: '9/16', maxWidth: '80%', borderRadius: '15px' },
        "title": {color: "var(--electric-green)"},
        "defaultStyle": { textDecoration: "none", color: "white" },
        "hoverStyle": { textDecoration: "none", color: "var(--teal)" }
    }

    const [hoveredLink, setHoveredLink] = useState(null);

    const defaultStyle = {
        textDecoration: "none",
        color: "black"
    };

    const hoverStyle = {
        textDecoration: "none",
        color: "white"
    };

    return (
    <>
        <div className='container d-block w-75'>
            <AboutSection description={<>
                <p>HackSussex 2026 is almost upon us! This unique event is hosted over a full weekend, including 24 hours of non-stop coding, workshops hosted by our sponsors, 4 mouth-wateringly tasty meals from local Brighton caterers, snacks and drinks, and an exclusive 2025 t-shirt, <strong>all for free</strong>!</p>
                <p>Your project can enter multiple of our many prize tracks. If you don’t have a team, find your family-for-the-weekend in our team building event! Together you’ll create a game, some software or something electronic. Have you never coded before? Have you been coding since before you were conceived? Are you competitive? Are you laid back? Want to boost your CV while having fun? Join us for our best Hackathon yet – you won’t want to miss this!</p>
                </>}
            list={["A laptop with a charger", "HDMI cable (we have monitors that you can use)", "Any peripherals you want to use in a project", "Any necessary hardware or tools, if you plan on working on a project with them", "Water bottle and reusbale cup for hot drinks", "Toiletries and any medication you require"]} />
            {/* <div className='container row rounded-4 my-2 mb-5 text-center text-dark' style={{backgroundColor: "var(--lime)"}}>
                <p className='display-6 text-decoration-underline'>Upcoming Train Strikes and Engineering Work</p>
                <p className='h5 lh-lg'>Please note the following:</p>
                <ul className='list-group-flush'>
                <li className='list-group-item'>- Gatwick Express between London Victoria and BrightonThameslink between Bedford / Cambridge and Brighton</li>
                <li className='list-group-item'>- Southern between London Victoria and Brighton / Littlehampton / Ore.</li>
                <li className='list-group-item'>- Thameslink between Bedford / Cambridge and Brighton</li>
                </ul>
                <p className='h5'>There are further strikes and engineering work planned around this time so please check with your rail travel provider before travelling.</p>
                <a
                style={hoveredLink === true ? hoverStyle : defaultStyle}
                onMouseEnter={() => setHoveredLink(true)}
                onMouseLeave={() => setHoveredLink(false)}
                className="fs-4"
                href='https://www.southernrailway.com/travel-information/plan-your-journey/planned-engineering-work'
                target="_blank"
                rel="noreferrer"
                >Click here for more information.</a>
            </div> */}
            {/* <div className='row d-none d-sm-flex m-3 justify-content-center'>
                <iframe
                    className="w-100 rounded" 
                    src="https://www.youtube.com/embed/X0D1yNHRXoI" 
                    style={styles.pcVideo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                    title="Hackathon Video"
                ></iframe>
            </div> */}
            {/* <div className='row d-none d-sm-flex justify-content-evenly m-3 mt-5'>
                <div className="col mx-3 ms-5">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Food</p>
                    <p>Some of Brighton's best food spots will join us on campus to keep you fed throughout the event. Previous caterers include:</p>
                    <ul>
                        <li>Oui! Creperie</li>
                        <li>Taquitos Casazul</li>
                        <li>Pizza Me</li>
                    </ul>
                </div>
                <div className="col mx-3">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Workshops</p>
                    <p>Take part in workshops run by our Sponsors that are guaranteed to teach you something new, that cover anything from emerging technology through to interview Prep.</p>
                </div>
                <div className="col mx-3 me-5">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Prizes</p>
                    <p>We've given away some great prizes at our events like:</p>
                    <ul>
                        <li>Nintendo Switches</li>
                        <li>iFixit kits</li>
                        <li>Ender-3 3D printers</li>
                    </ul>
                </div>
            </div> */}
            {/* <div className='row d-sm-none m-1 d-flex justify-content-center'>
                <div className="col mx-3">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Food</p>
                    <p>Some of Brighton's best food spots will join us on campus to keep you fed throughout the event. Previous caterers include:</p>
                    <ul>
                        <li>Oui! Creperie</li>
                        <li>Taquitos Casazul</li>
                        <li>Pizza Me</li>
                    </ul>
                </div>
                <div className="col mx-3">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Workshops</p>
                    <p>Take part in workshops run by our Sponsors that are guaranteed to teach you something new, that cover anything from emerging technology through to interview Prep.</p>
                </div>
                <div className="col mx-3">
                    <p id="example-title" className="display-3 text-start fw-bold" style={styles.title}>Prizes</p>
                    <p>We've given away some great prizes at our events like:</p>
                    <ul>
                        <li>Nintendo Switches</li>
                        <li>iFixit kits</li>
                        <li>Ender-3 3D printers</li>
                    </ul>
                </div>
            </div> */}
        </div>
        <div className='container d-block d-sm-none w-100'>
            <div className='row'>
                <p className='col m-2 p-2 text-light text-center display-4'>What actually is a hackathon?</p>
            </div>
            <AboutSection description={<>
                <p>HackSussex 2026 is almost upon us! This unique event is hosted over a full weekend, including 24 hours of non-stop coding, workshops hosted by our sponsors, 4 mouth-wateringly tasty meals from local Brighton caterers, snacks and drinks, and an exclusive 2025 t-shirt, <strong>all for free</strong>!</p>
                <p>Your project can enter multiple of our many prize tracks. If you don’t have a team, find your family-for-the-weekend in our team building event! Together you’ll create a game, some software or something electronic. Have you never coded before? Have you been coding since before you were conceived? Are you competitive? Are you laid back? Want to boost your CV while having fun? Join us for our best Hackathon yet – you won’t want to miss this!</p>
                </>}
                list={["A laptop with a charger", "HDMI cable (we have monitors that you can use)", "Any peripherals you want to use in a project", "Any necessary hardware or tools, if you plan on working on a project with them", "Water bottle and reusbale cup for hot drinks", "Toiletries and any medication you require"]} />
        </div>
    </>
    );
}

export default HackathonAbout;