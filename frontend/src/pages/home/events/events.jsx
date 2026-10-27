import React from "react";
import styles from "./events.module.css";
import messages from "./events.messages";
import { useNavigate } from "react-router-dom";
import { useSiteData } from "../../../hooks/useSiteData";
import TopHeader from "../../../components/topHeader/TopHeader";

const EventTypes = () => {
  const navigate = useNavigate();
  const { siteData } = useSiteData();

  return (
    <section className={styles.container}>
      <TopHeader
        title={messages.pageTitle}
        ctaText={messages.description}
        ctaButtonLabel={messages.ctaButton}
        onCtaClick={() =>
          window.open(
            "https://docs.google.com/forms/d/e/1FAIpQLSfRM_qgPo4I5--Ijp-Bd2Ttf_01-5zOGZpxDtPRwwIslpO2EA/viewform?usp=publish-editor",
            "_blank",
          )
        }
      />
      <div className={styles.grid}>
        {messages.eventTypes.map((event) => {
          const Icon = event.icon;

          return (
            <div key={event.id} className={styles.card}>
              <Icon />
              <h2 className={styles.name}>{event.title}</h2>
              <p className={styles.description}>{event.description}</p>
              <button
                onClick={() => {
                  navigate("/events/" + event.id);
                }}
              >
                Learn More
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default EventTypes;
