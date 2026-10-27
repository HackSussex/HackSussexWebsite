import React from "react";
import styles from "./topHeader.module.css";

const TopHeader = ({ title, ctaText, ctaButtonLabel, onCtaClick }) => {
  return (
    <header className={styles.container}>
      <div className={styles.topLine}>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.bottom}>
        {typeof ctaText === "string" ? (
          <p className={styles.ctaText}>{ctaText}</p>
        ) : (
          <div className={styles.bottomText}>{ctaText}</div>
        )}
        {ctaButtonLabel && (
          <button className={styles.ctaButton} onClick={onCtaClick}>
            {ctaButtonLabel}
          </button>
        )}
      </div>
    </header>
  );
};

export default TopHeader;
