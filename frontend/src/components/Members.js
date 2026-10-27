import { useState } from "react";
import PhotoCard from "./PhotoCard";

const PreviousMembers = ({ year, committee, index, collapsable }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-center">
      <a
        className="text-center mb-5 text fw-bold display-4 border-bottom w-75 ms-auto me-auto pb-3 text-decoration-none text-light d-flex align-items-center justify-content-center"
        data-bs-toggle={collapsable ? "collapse" : ""}
        href={"#previousMembers" + year}
        role="button"
        aria-expanded="false"
        aria-controls={"previousMembers" + year}
        onClick={(e) => {
          e.preventDefault();
          setExpanded(!expanded);
        }}
      >
        <h1 className="mb-0 text fw-bold display-4 me-3">
          {index === 0
            ? "Meet the Committee"
            : `${year}/${year + 1} Committee`}
        </h1>
        {collapsable ? (
          <h1 className="mb-0 text fw-bold display-4">
            {expanded ? "-" : "+"}
          </h1>
        ) : null}
      </a>

      <div
        className={collapsable ? "collapse" : ""}
        id={"previousMembers" + year}
      >
        {Array(Math.ceil(committee.length / 5))
          .fill()
          .map((_, rowIndex) => (
            <div className="row d-flex justify-content-center" key={rowIndex}>
              {committee
                .slice(rowIndex * 5, (rowIndex + 1) * 5)
                .map((member) => (
                  <div
                    className="col-lg-2 col-md-3 col-sm-4 col-12 mb-5"
                    key={member.name + year}
                  >
                    <PhotoCard {...member} />
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviousMembers;
