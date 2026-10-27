import React from "react";
import styles from "./joinCommittee.module.css";
import messages from "./joinCommittee.messages";
import HSImage from "../../../assets/hackSussex/committee.jpg";
import { useNavigate } from "react-router-dom";

const JoinCommittee = () => {
  const { title, description, buttonLabel } = messages;
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{messages.heading}</h1>
      <p className={styles.description}>{messages.message}</p>
      <div className={styles.container}>
        <img src={HSImage} alt={title} className={styles.image} />
        <div className={styles.overlay}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <button
            onClick={() => {
              navigate("/contact#committee");
            }}
            className={styles.button}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommittee;
