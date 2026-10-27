import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import useFetchData from "../../../../hooks/useFetchData";
import useStaging from "../../../../hooks/useStaging";
import useToken from "../../../../hooks/useToken";
import { writeJsonFile } from "../../../../util/githubWrite";
import { useOverlay } from "../../../../hooks/useOverlay";
import { EventForm } from "../events";
import styles from "./eventDetails.module.css";
import LoadingScreen from "../../../../components/loading";

const EventDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: eventsDataRaw, loading: eventsLoading, errorMsg: eventsError } =
    useFetchData("events.json");
  const { data: sponsorsDataRaw } = useFetchData("sponsors.json");
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges } =
    useStaging();
  const token = useToken();
  const { openOverlay } = useOverlay();
  const repo = process.env.REACT_APP_GITHUB_REPO;

  const [event, setEvent] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    if (eventsDataRaw && !localData?.events) updateLocalData("events", eventsDataRaw);
    if (sponsorsDataRaw && !localData?.sponsors) updateLocalData("sponsors", sponsorsDataRaw);
  }, [eventsDataRaw, sponsorsDataRaw, localData, updateLocalData]);

  useEffect(() => {
    if (!localData?.events || !localData?.sponsors) return;

    const allEvents = [
      ...localData.events.upcomingEvents,
      ...localData.events.pastEvents,
    ];
    const foundEvent = allEvents.find((e) => String(e.id) === String(id));
    setEvent(foundEvent);
    setSponsors(localData.sponsors);
  }, [localData, id]);

  if (eventsLoading || !localData?.events || !localData?.sponsors)
    return  <LoadingScreen message={"loading event"}/>;
  if (eventsError) return <p className="error-msg">{eventsError}</p>;
  if (!event) return <p>Event not found.</p>;

  const getSponsor = (id) => sponsors.find((s) => s.id === id);

  const isPastEvent = localData.events.pastEvents.some((e) => e.id === event.id);

  const saveSponsor = (s) =>
  {
    const updated = [...sponsorsDataRaw, s];
    updateLocalData("sponsors", updated);
    addChange("sponsors", "create", { sponsor: s })
  }

  const handleEdit = () => {
    openOverlay(
      <EventForm
        formTitle="Edit Event"
        formDescription="Update the details of the event."
        formData={event}
        sponsors={sponsors}
        saveOrCreate="edit"
        isPastEvent={isPastEvent}
        saveSponsor={saveSponsor}
        openOverlay={openOverlay}
        saveEvent={(ev) => {
          const updatedEvents = {
            ...localData.events,
            upcomingEvents: localData.events.upcomingEvents.map((e) =>
              e.id === ev.id ? ev : e
            ),
            pastEvents: localData.events.pastEvents.map((e) =>
              e.id === ev.id ? ev : e
            ),
          };
          updateLocalData("events", updatedEvents);
          addChange("events", "edit", { object: ev });
          setEvent(ev);
        }}
      />,
      event
    );
  };

  const handleDelete = () => {

    const section = isPastEvent ? "pastEvents" : "upcomingEvents";

    const updatedEvents = {
      ...localData.events,
      [section]: localData.events[section].filter((e) => e.id !== event.id),
    };

    updateLocalData("events", updatedEvents);
    addChange("events", "delete", { object: event, section });

    navigate("/dashboard/events");
  };

  const undoChanges = () => {
    if (!window.confirm("Discard all staged changes?")) return;
    updateLocalData("events", eventsDataRaw);
    clearChanges("events");
  };

  return (
    <div className={styles.eventsPage}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <span className={"back-arrow-container"}>
            <FaArrowLeft
              className={"back-arrow"}
              onClick={() => navigate("/dashboard/events")}
            />
            <h1>{event.title}</h1>
          </span>
        </div>
      </div>

      <div className={styles.eventDetails}>
        <p>
          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
        </p>
        <p>
          <strong>Event Type:</strong> {event.eventType}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        {!isPastEvent && (
          <p>
            <strong>Ticket Link:</strong>{" "}
            <a href={event.ticketsLink} target="_blank" rel="noreferrer">
              {event.ticketsLink}
            </a>
          </p>
        )}
        <p>
          <strong>Event Descriptions</strong> {event.description}
        </p>

        <h3>Event Logo</h3>
        {event._preview || event.logo ? (
          <img
            className={styles.eventLogo}
            src={event._preview || event.logo}
            alt="Event Logo"
          />
        ) : (
          <p>No logo uploaded.</p>
        )}

        <h3>Event Sponsors</h3>
        {event.sponsors?.length > 0 ? (
        <div className={styles.sponsorGrid}>
          {
            event.sponsors.map((sId) => {
              const s = getSponsor(sId);
              if (!s) return null;
              return (
                <div key={s.id} className={styles.sponsorItem} onClick={() => navigate(`/dashboard/sponsors/${s.id}`)}>
                  <img src={s.logoUrl} alt={s.name} />
                  <p>{s.name}</p>
                </div>
              );
            })
          }
          </div>)
          : (
            <p className="empty-msg">No sponsors for this event.</p>
          )}
      </div>

      <div className={styles.bottomButtons}>
        <button
          className="secondaryBtn"
          disabled={!stagedChanges.events?.length}
          onClick={undoChanges}
        >
          Undo Changes
        </button>
        <button className="secondaryBtn" onClick={handleEdit}>
          Edit Event
        </button>
        <button className="secondaryBtn" onClick={handleDelete}>
          Delete Event
        </button>
        <button
          className="primaryBtn"
          disabled={!stagedChanges.events?.length}
          onClick={() => {commitChanges(["events"])}}
        >
          Commit Changes
        </button>
      </div>
    </div>
  );
};

export default EventDetailsPage;
