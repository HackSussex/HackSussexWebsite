import React from "react";
import styles from "../views/About.module.css";

import { FaGithub, FaLinkedin } from "react-icons/fa";

const PhotoCard = ({
  imageUrl,
  name,
  role,
  email,
  githubLink,
  linkedinLink,
}) => {
  return (
    <div className="text-center mb-4 about-images">
      {imageUrl ? (
        <img src={imageUrl} alt={`${name}`} className="rounded-3" />
      ) : null}
      <h5 className={styles.blackText + " mt-3 fw-bold"}>{name}</h5>
      <div className={styles.roleText + " fw-bold"}>{role}</div>
      <a href={`mailto:${email}`} className={styles.emailLink}>
        {email}
      </a>
      <div className="d-flex justify-content-center mt-2">
        {githubLink ? (
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FaGithub className={styles.icon} />
          </a>
        ) : null}
        {linkedinLink ? (
          <a
            href={linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2"
          >
            <FaLinkedin className={styles.icon} />
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default PhotoCard;
