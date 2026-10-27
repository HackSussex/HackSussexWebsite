import React, { useEffect, useState } from "react";
import { useSiteData } from "../../../hooks/useSiteData";
import styles from "./upcomingEvents.module.css";
import messages from "./upcomingEvents.messages";
import Event from "../../../components/event/event";
import { useNavigate } from "react-router-dom";
import TopHeader from "../../../components/topHeader/TopHeader";

const UpcomingEvents = () => {
  const { events, sponsors, loading } = useSiteData();
  const navigate = useNavigate();

  const [timers, setTimers] = useState({});

  useEffect(() => {
    if (!events?.upcomingEvents) return;

    const interval = setInterval(() => {
      const updatedTimers = {};

      events.upcomingEvents.forEach((event) => {
        const eventDate = new Date(event.date);
        const cutoffDate = new Date(
          eventDate.getTime() - 7 * 24 * 60 * 60 * 1000,
        );

        const now = Date.now();
        const diff = cutoffDate - now;

        if (diff <= 0) {
          updatedTimers[event.id] = {
            closed: true,
          };
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        updatedTimers[event.id] = {
          text: `${days}d ${hours}h ${minutes}m ${seconds}s`,
          closed: false,
        };
      });

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  if (loading) {
    return <p className={styles.loading}>{messages.loadingText}</p>;
  }

  if (!events?.upcomingEvents?.length) {
    return <div className={styles.container}></div>;
  }

  return (
    <div className={styles.container}>
      <TopHeader
        title={messages.heading}
        ctaText={messages.description}
        ctaButtonLabel={messages.ctaButton}
        onCtaClick={() => navigate("/events")}
      />

      <div className={styles.upComingEvent}>
        {events.upcomingEvents.map((event) => (
          <Event
            key={event.id}
            event={event}
            sponsors={sponsors}
            timer={timers[event.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;
