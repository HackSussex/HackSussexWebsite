import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./event.module.css";
import messages from "./event.messages";
import { githubRawToLocal } from "../../util/githubRawToLocal";
import { getSponsorsByTier, flattenSponsors } from "../../util/sponsorHelpers";

const Event = ({
  event,
  sponsors,
  timer,
  simpleDesign = false,
  isPast = false,
}) => {
  // helper to render up to 3 lines and preserve manual breaks
  const renderDescription = (text) => {
    if (!text) return null;
    const lines = text.split(/\r?\n/);
    if (lines.length <= 3) {
      return lines.map((line, i) => (
        <span key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </span>
      ));
    }
    const firstThree = lines.slice(0, 3);
    return firstThree.map((line, i) => (
      <span key={i}>
        {line}
        {i < firstThree.length - 1 ? <br /> : "…"}
      </span>
    ));
  };
  const navigate = useNavigate();

  const ticketsClosed = timer?.closed;
  const timerKnown = typeof timer !== "undefined" && timer !== null;
  const eventDate = new Date(event.date);
  const now = new Date();
  const showAddToCalendar = now < eventDate;

  const handleAddToCalendar = () => {
    const start = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0];
    const end = new Date(eventDate.getTime() + 2 * 60 * 60 * 1000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0];

    const icsContent = `
      BEGIN:VCALENDAR
      VERSION:2.0
      PRODID:-//HackSussex//Event//EN
      BEGIN:VEVENT
      UID:${event.id}@hacksussex.com
      DTSTAMP:${start}Z
      DTSTART:${start}Z
      DTEND:${end}Z
      SUMMARY:${event.title}
      DESCRIPTION:${event.description}
      LOCATION:${event.location}
      END:VEVENT
      END:VCALENDAR
      `.trim();

    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // normalise the event's sponsor data using the shared helper
  const sponsorsByTier = getSponsorsByTier(event, sponsors);
  const eventSponsors = flattenSponsors(sponsorsByTier);

  // -------------------
  // Simple Card JSX
  // -------------------
  if (simpleDesign) {
    return (
      <div className={styles.simpleCard}>
        {/* Column 1: Image */}
        <img
          src={githubRawToLocal(event.logo)}
          alt={`${event.title} Logo`}
          className={styles.simpleImage}
        />

        {/* Column 2: Title / Date / Location */}
        <div className={styles.simpleDetails}>
          <h2 className={styles.eventTitle}>{event.title}</h2>
          <p className={styles.date}>
            {eventDate.toLocaleDateString("en-GB", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className={styles.location}>{event.location}</p>
        </div>

        {/* Column 3: Buttons */}
        <div className={styles.simpleButtons}>
          {showAddToCalendar && (
            <button className="secondary" onClick={handleAddToCalendar}>
              {messages.calendarBtnText}
            </button>
          )}
          <button
            className="secondary"
            onClick={() => navigate(`/schedules/${event.id}`)}
          >
            {isPast
              ? messages.detailsBtnText || "See details"
              : event.schedule && event.schedule.length > 0
                ? messages.scheduleBtnText
                : messages.detailsBtnText || "See details"}
          </button>
          {timerKnown ? (
            ticketsClosed && !isPast ? (
              <button disabled>{messages.ticketsClosedText}</button>
            ) : event.ticketsLink?.startsWith("https") ? (
              <button
                onClick={() =>
                  window.open(
                    event.ticketsLink,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                {messages.ticketsBtnText}
              </button>
            ) : null
          ) : null}
        </div>
      </div>
    );
  }

  console.log("Description:", event.description);

  return (
    <div className={styles.eventWrapper}>
      <div className={styles.eventCard}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <img
            src={githubRawToLocal(event.logo)}
            alt={`${event.title} Logo`}
            className={styles.logo}
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.eventTitle}>{event.title}</h2>

          <p className={styles.location}>{event.location}</p>

          {/* render description with preserved breaks and limit to three lines */}
          <p className={styles.description}>
            {renderDescription(event.description)}
          </p>

          {!ticketsClosed && timer?.text && (
            <p className={styles.countdown}>{timer.text}</p>
          )}

          {/* {eventSponsors?.length > 0 && (
            <div className={styles.sponsors}>
              <div className={styles.sponsorRow}>
                {['gold','silver','bronze','partner','other'].map((tier) =>
                  (sponsorsByTier[tier] || []).map((sponsor) => (
                    <div key={sponsor.id} className={styles.sponsorCard}>
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className={styles.sponsorLogo}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )} */}

          {/* Date */}
          <p className={styles.date}>
            {eventDate.toLocaleDateString("en-GB", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* Buttons */}
          <div className={styles.buttons}>
            {showAddToCalendar && (
              <button className="secondary" onClick={handleAddToCalendar}>
                {messages.calendarBtnText}
              </button>
            )}
            <button
              className="secondary"
              onClick={() => navigate(`/schedules/${event.id}`)}
            >
              {messages.scheduleBtnText}
            </button>
            {timerKnown ? (
              ticketsClosed && !isPast ? (
                <button disabled>{messages.ticketsClosedText}</button>
              ) : event.ticketsLink?.startsWith("https") ? (
                <button
                  onClick={() =>
                    window.open(
                      event.ticketsLink,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  {messages.ticketsBtnText}
                </button>
              ) : null
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
