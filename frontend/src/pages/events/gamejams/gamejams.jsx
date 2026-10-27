import React from "react";
import messages from "./gamejams.messages";
import styles from "./gamejams.module.css";

const GameJam = () => {
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
            alt={`Game Jam ${index + 1}`}
            className={styles.image}
          />
        ))}
      </div>
    </section>
  );
};

export default GameJam;
