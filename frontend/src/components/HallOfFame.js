import React from 'react';

const HallOfFame = ({ data }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5 text fw-bold display-4 border-bottom w-75 ms-auto me-auto pb-3">Hall of Fame</h1>

      {data.map((entry, index) => (
        <div key={index} className="row align-items-center mb-5">
          <div className="col-12 col-md-2 order-1 order-md-1 d-flex justify-content-center mb-3">
            <img src={entry.imageUrl} alt={entry.title} className="img-fluid" />
          </div>
          <div className="col-12 col-md-10 order-2">
            <h2 className="font-weight-bold">{entry.title}</h2>
            <h4>{entry.subheading}</h4>
            {entry.paragraph.split('\n').map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HallOfFame;
