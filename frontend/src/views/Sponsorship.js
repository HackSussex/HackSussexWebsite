import { useState, useEffect } from "react";
import sponsorsLogos from "../components/helpers/SponsorsHelper";

const Sponsorship = () => {
  // change this link to sponsor video when ready, then uncomment i-frame
  const videoUrl = "https://www.youtube.com/embed/XAIrb-ik6Xo?si=rKDsS7GpC8U7Mb6J";
  const prospectusUrl =
    "https://raw.githubusercontent.com/HackSussexP/public_assets/main/prospectus.pdf";

  // prospectus is fecthed and stored in a Blob
  const [prospectusBlob, setProspectusBlob] = useState(null);

  useEffect(() => {
    let btn = document.getElementById("prospectusBtn");
    fetch(prospectusUrl)
      .then((response) => {
        if (response.ok) {
          btn.innerText = "Download prospectus";
          return response.blob();
        } else {
          btn.setAttribute("disabled", true);
          btn.innerText = "Oops, can't load prospectus!";
          return Promise.reject(response.status);
        }
      })
      .then((blob) => setProspectusBlob(blob))
      .catch((error) => console.error("Error fetching the file:", error));
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(prospectusBlob);
    link.download = "prospectus.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(prospectusBlob);
  };

  return (
    <div className="container mt-5">
      <h1 className="display-3 fw-bold text-center mb-2">Partner with us</h1>
      <iframe
        className="w-100 rounded p-2 mx-auto d-block"
        src={videoUrl}
        style={{
          aspectRatio: "16/9",
          maxWidth: "720px",
          borderRadius: "15px",
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Hackathon Video"
      ></iframe>
      <section className="p-4">
        <p>
          At HackSussex, we’re all about bringing together students who are
          passionate about computer science and love to learn, create, and
          innovate. We host hackathons, workshops, and networking events that
          help our members build skills, meet industry professionals, and work
          on real-world projects.
        </p>
        <p>
          To make this possible, we're always looking for partners to
          collaborate with. It's a great way to connect with graduating students
          and the wonderful community at the University of Sussex!{" "}
        </p>
        <p>
          For more details, download our prospectus below. If you have any
          questions, feel free to email us at{" "}
          <a href="mailto:contact@hacksussex.com">contact@hacksussex.com</a>.
          We’d love to hear from you!
        </p>
        <button
          type="button"
          id="prospectusBtn"
          className="btn btn-blue btn-lg d-block mx-auto my-4"
          onClick={handleDownload}
        >
          Loading...
        </button>
      </section>
      <h2 className="display-4 fw-bold pb-3 mx-auto text-center border-bottom w-75">
        Past Sponsors
      </h2>
      <section className="row px-5 my-5 justify-content-around align-items-center">
        {sponsorsLogos.map((company) => {
          return (
            <div className="col-sm-auto px-sm-4 px-0 my-4" key={company.name}>
              <a href={company.link} target="_blank" rel="noreferrer">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="old-sponsors-logo d-block mx-auto"
                ></img>
              </a>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Sponsorship;
