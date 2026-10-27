import React from "react";
import styles from "./About.module.css";

import committeeMembers from "../constants/CommitteeMembers";
import Members from "../components/Members";

const About = () => {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col text-center">
            <h1 className="display-3 fw-bold">Hi, we are HackSussex</h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col px-4">
            <p className={styles.responsiveText}>
              We’ve been the University of Sussex’s Society for all things
              computer science since 2012. Our mission is to foster a dynamic
              and collaborative environment where students passionate about
              computer science can come together to learn, create, and innovate.{" "}
            </p>
            <p className={styles.responsiveText}>
              We organise various events, workshops, hackathons, and networking
              sessions that provide our members with opportunities to enhance
              their skills, connect with industry professionals, and work on
              real-world projects. Over the years, we have forged strong
              collaborations with many organisations in order to bring these
              events to life and to help deliver on our mission by providing
              valuable opportunities to our student members.{" "}
            </p>
            <p className={styles.responsiveText}>
              We’d encourage everyone to get stuck into our online community and
              in-person events. Whether you’re a programming prodigy or just
              dipping your toes into tech, HackSussex has time, space and
              resources to learn and grow!{" "}
            </p>
            <p className={styles.responsiveText}>
              If you’d like to collaborate with us then please do not hesitate
              to get in touch{" "}
              <a href="mailto:contact@hacksussex.com">contact@hacksussex.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.meetCommitteeSection}>
        <div className="container mt-5">
          {committeeMembers.map((value, index) => (
            <div key={index}>
              <Members
                index={index}
                year={value.year}
                committee={value.data}
                collapsable={index !== 0}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
