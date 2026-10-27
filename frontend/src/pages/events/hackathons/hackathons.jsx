import React from "react";
import messages from "./hackathons.messages";
import styles from "./hackathons.module.css";

const Hackathon = () => {
  const { title, description1, description2, images } = messages;

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>

      <p>{description1}</p>
      <p>{description2}</p>

      <div className={styles.imagesContainer}>
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Hackathon ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>
    </section>
  );
};

export default Hackathon;
