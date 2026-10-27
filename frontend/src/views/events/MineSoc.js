import AboutSection from "../../components/AboutSection";
import Amex from "../../assets/Events/MineSoc/pics/Amex.png";
import EastSlope from "../../assets/Events/MineSoc/pics/EastSlope_1.png";
import FalmerHouse from "../../assets/Events/MineSoc/pics/FalmerHouse_2.png";
import Freshers from "../../assets/Events/MineSoc/pics/Freshers.jpg";
import Jubilee from "../../assets/Events/MineSoc/pics/Jubilee.png";
import Library from "../../assets/Events/MineSoc/pics/Library.png";
import MineSocBackground from "../../assets/Events/MineSoc/MineSocBackground.png";
import MineSocLogo from "../../assets/Events/MineSoc/MineSocLogo.png";
import React from "react";
import survival_1 from "../../assets/Events/MineSoc/pics/survival_1.png";
import survival_2 from "../../assets/Events/MineSoc/pics/survival_2.png";
import survival_3 from "../../assets/Events/MineSoc/pics/survival_3.jpg";
import survival_4 from "../../assets/Events/MineSoc/pics/survival_4.jpg";
import survival_5 from "../../assets/Events/MineSoc/pics/survival_5.jpg";
import survival_6 from "../../assets/Events/MineSoc/pics/survival_6.jpg";

// images

var images = [Amex, EastSlope, FalmerHouse, Freshers, Jubilee, Library, survival_1, survival_2, survival_3, survival_4, survival_5, survival_6];

const MineSoc = () => {
    const containerStyle = {
        height: '200px',
        overflow: 'hidden',
    }

    const coverImageStyle = {
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    }

  return (
    <>
      <div className="carousel-inner p-0">
        <img src={MineSocBackground} className="d-block img-fluid w-100 splash" alt='Background' />
        <div className="carousel-caption">
          <img src={MineSocLogo} alt="MineSoc Logo" className='img-fluid ms-auto me-auto d-block p-3' style={{ width: '40%', height: 'auto' }} />
        </div>
      </div>
      <AboutSection description={[<>
                    <p>
                    MineSoc is a vibrant Minecraft society at the University of Sussex, offering students a space 
                    to connect through their shared love of the game. Collaborating with HackSussex, they run 
                    high-performance servers, including a survival server and various minigames. A unique highlight 
                    is their ambitious recreation of the Sussex campus in Minecraft, which students can help build. 
                    They frequently host events like the Hunger Games and support both Java and Bedrock editions 
                    of Minecraft. With a focus on community engagement, MineSoc aims to provide a fun and creative 
                    environment for all players, encouraging teamwork and exploration.
                    </p>
                    <p>
                        To find out more and how to join, visit their <a href="https://www.instagram.com/MineSocsussex/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    </p>
                    </>
                    ]} />

      <h2 className="display-4 fw-bold pb-3 mx-auto text-center border-bottom w-75">
        Showcase
      </h2>

      <div className="container mt-4">
        <div className="row">
          {images.map((image) => {
              return (
                <div key={image} className="col-md-4 mb-4" style={containerStyle}>
                  <img
                    src={image}
                    style={coverImageStyle}
                    alt="MineSoc" />
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default MineSoc;