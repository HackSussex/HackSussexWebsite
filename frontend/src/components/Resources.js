import React, { useState } from "react";

const Resources = ({ links }) => {
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
    <div className="container-fluid justify-content-center text-center text-white">
      <div className="col">
        <div className="row p-5">
        <h1 className="text-center mb-5 text fw-bold display-4 border-bottom w-75 ms-auto me-auto pb-3">Resources</h1>
        </div>
        {links.map((link, index) => (
          <div key={index} className="row">
            <a
              style={hoveredLink === index ? hoverStyle : defaultStyle}
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
              className="fs-4"
              href={link.url}
            >
              {link.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Resources;
