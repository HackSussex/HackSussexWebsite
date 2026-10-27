import React, { useState } from "react";

const CodesOfConduct = ({ links }) => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const defaultStyle = {
    textDecoration: "none",
    color: "white"
  };

  const hoverStyle = {
    textDecoration: "none",
    color: "#34d2c8"
  };

  return (
    <div className="container-fluid text-center text-white" style={{backgroundColor: "var(--darker-blue)"}}>
        <div className="row p-2 justify-content-center">
          <div className="col-auto">
            <h1 className="pb-1 text fw-bold h3 ms-auto me-auto">{links.length > 1 ? "This event is run is accordance with the following codes of conduct:" :"This event is run is accordance with the following code of conduct:"}</h1>
          </div>
            {links.map((link, index) => (
                <div key={index} className="col-auto">
                    <a
                        style={hoveredLink === index ? hoverStyle : defaultStyle}
                        onMouseEnter={() => setHoveredLink(index)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="fs-4"
                        href={link.url}
                    >
                      {index == 0 ? link.name + ", " : link.name}
                    </a>
                </div>
            ))}
        </div>
    </div>
  );
}

export default CodesOfConduct;