import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import useStaging from "../../../hooks/useStaging";
import useToken from "../../../hooks/useToken";
import { writeJsonFile } from "../../../util/githubWrite";
import { useOverlay } from "../../../hooks/useOverlay";
import styles from "./events.module.css";
import { useNavigate } from "react-router-dom";
import { SponsorForm } from "../sponsors/sponsors";
import LoadingScreen from "../../../components/loading";
import { eventList } from "../../../config/events";

export const EventForm = ({
  formTitle,
  formDescription,
  formData,
  closeOverlay,
  openOverlay,
  saveEvent,
  saveOrCreate,
  sponsors,
  addNewEvent,
  saveSponsor,
  isPastEvent
}) => {
  const [data, setData] = useState(formData || {});
  const [logoPreview, setLogoPreview] = useState(formData?.logo || "");

  useEffect(() => {
    if (formData) {
      setData(formData);
      setLogoPreview(formData._preview || formData.logo || "");
    }
  }, [formData]);

  const toggleSponsor = (id) => {
    const current = data.sponsors || [];
    const updated = current.includes(id)
      ? current.filter((s) => s !== id)
      : [...current, id];
    setData({ ...data, sponsors: updated });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);

    setData({
      ...data,
      logo: file.name,     
      _logoFile: file,     
      _preview: previewUrl  
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveEvent(data);
    closeOverlay();

    if (saveOrCreate === "create" && addNewEvent) {
      addNewEvent(data.id);
    }
  };

  const handleEventTypeChange = (e) => {
    setData({ ...data, eventType: e.target.value });
  };

  const handleSectionChange = (section) => {
    setData({ ...data, section });
  };

  return (
    <>
      <h2>{formTitle}</h2>
      <p>{formDescription}</p>

      <form onSubmit={handleSave} className={styles.form}>
        <input
          placeholder="Title"
          value={data.title || ""}
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />

        <input
          type="datetime-local"
          value={data.date
            ? new Date(data.date).toISOString().substring(0, 16)
            : ""}
          onChange={(e) =>
            setData({ ...data, date: new Date(e.target.value).toISOString() })
          }
        />

        <input
          placeholder="Location"
          value={data.location || ""}
          onChange={(e) => setData({ ...data, location: e.target.value })}
        />

        {!isPastEvent && <input
          type="url"
          placeholder="Ticket Link"
          value={data.ticketsLink || ""}
          onChange={(e) => setData({ ...data, ticketsLink: e.target.value })}
        />}

        {/* {saveOrCreate === "create" && (
          <div className={styles.pastUpcomingButtons}>
            <button
              type="button"
              className={data.section === "pastEvents" ? "active" : ""}
              onClick={() => handleSectionChange("pastEvents")}
            >
              Past Event
            </button>
            <button
              type="button"
              className={data.section === "upcomingEvents" ? "active" : ""}
              onClick={() => handleSectionChange("upcomingEvents")}
            >
              Upcoming Event
            </button>
          </div>
        )} */}

        <select
          value={data.eventType || ""}
          onChange={handleEventTypeChange}
        >
          <option value="" disabled>
            Select Event Type
          </option>
          {eventList.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>

        <div className={styles.descriptionLogoHolder}>
          <textarea
            placeholder="Description"
            value={data.description || ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />

          {/* Logo Upload */}
          <div className={styles.logoUpload}>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.svg"
              onChange={handleLogoChange}
              id="logoInput"
              style={{ display: "none" }}
            />
            <label htmlFor="logoInput" style={{ cursor: "pointer" }}>
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className={styles.logoPreview}
                />
              ) : (
                <div className={styles.logoPlaceholder}>
                  Click to upload logo
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Sponsor Selection Grid */}
        <div className={styles.sponsorGrid}>
          {sponsors?.map((s) => {
            const selected = data.sponsors?.includes(s.id);
            return (
              <div
                key={s.id}
                className={`${styles.sponsorItem} ${
                  selected ? styles.selectedSponsor : ""
                }`}
                onClick={() => toggleSponsor(s.id)}
              >
                <img src={s.logoUrl} alt={s.name} />
              </div>
            );
          })}
        </div>


        <div className={styles.formButtons}>
          <button
            type="button"
            className={"secondaryBtn"}
            onClick={() => {
              const confirmOpen = window.confirm(
                "Opening the Add Sponsors form will discard any unsaved changes in this event. Do you want to continue?"
              );
              if (confirmOpen) {
                const newSponsor = { id: "sponsor_" + Math.random().toString(36).slice(2), name: "", website: "", logoUrl: "" };
                openOverlay(<SponsorForm 
                              formTitle="Add New Sponsor"
                              formDescription="You must commit the new sponsor before refrencing it in an event"
                              formData={newSponsor}
                              saveSponsor={(s) => {saveSponsor(s)}}
                />, newSponsor);
              }
            }}
          >
            Add Sponsors
          </button>
          <div className={"button-container"}>
            <button
              type="button"
              className={"secondaryBtn"}
              onClick={closeOverlay}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={"primaryBtn"}
              disabled={
                (saveOrCreate === "edit" &&
                  JSON.stringify(formData) === JSON.stringify(data)) ||
                !data.title ||
                !data.date ||
                !data.location ||
                !data.description
                }
            >
              {saveOrCreate === "create" ? "Create Event" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const EventsPage = () => {
  const { data: events, loading: eventsLoading, errorMsg: eventsError } =
    useFetchData("events.json");
  const { data: sponsorsData } = useFetchData("sponsors.json");
  const token = useToken();
  const navigate = useNavigate();
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges } =
    useStaging();
  const { openOverlay } = useOverlay();

  const [newEvents, setNewEvents] = useState([]);

  const getCommittedSponsors = () =>
    Array.isArray(sponsors) ? sponsors.filter(s => !s._preview) : [];

  if (eventsLoading || !localData?.events || !localData?.sponsors)
    return  <LoadingScreen message={"loading events"}/>;
  if (eventsError) return <p className="error-msg">{eventsError}</p>;

  const saveSponsor = (s) => {
    const updated = [...localData?.sponsors, s];
    updateLocalData("sponsors", updated);
    addChange("sponsors", "create", { object: s });
    navigate("/dashboard/sponsors")
  }

  const eventsData = localData.events;
  const sponsors = localData.sponsors;

  const getSponsor = (id) => Array.isArray(sponsors) ? sponsors.find((s) => s.id === id) : undefined;

  const handleCreate = () => {
    const newEvent = {
      id: "evt_" + Math.random().toString(36).slice(2),
      title: "",
      date: new Date().toISOString(),
      location: "",
      description: "",
      sponsors: [],
      logo: "",
      section: "upcomingEvents"
    };
    openOverlay(
      <EventForm
        formTitle="Create New Event"
        formData={newEvent}
        formDescription="Fill in the details for the new event."
        sponsors={getCommittedSponsors()}
        saveOrCreate="create"
        saveSponsor={saveSponsor}
        openOverlay={openOverlay}
        addNewEvent={(id) => setNewEvents((prev) => [...prev, id])}
        saveEvent={(ev) => {
          const updated = {
            ...eventsData,
            [ev.section]: [...eventsData[ev.section], ev]
          };
          updateLocalData("events", updated);
          addChange("events", "create", { object: ev });

        }}
      />,
      newEvent
    );
  };

  const handleEdit = (event, section) => {
    openOverlay(
      <EventForm
        formTitle="Edit Event"
        formDescription="Update the details of the event."
        formData={event}
        sponsors={getCommittedSponsors()}
        openOverlay={openOverlay}
        saveOrCreate="edit"
        saveSponsor={saveSponsor}
        isPastEvent={section === "pastEvents"}
        saveEvent={(ev) => {
          const updated = {
            ...eventsData,
            upcomingEvents: eventsData.upcomingEvents.map((e) =>
              e.id === ev.id ? ev : e
            ),
            pastEvents: eventsData.pastEvents.map((e) =>
              e.id === ev.id ? ev : e
            )
          };
          updateLocalData("events", updated);
          addChange("events", "edit", { object:ev });
        }}
      />,
      event
    );
  };

  const handleDelete = (e, section) => {
    const updated = {
      ...eventsData,
      [section]: eventsData[section].filter((event) => event.id !== e.id)
    };
    updateLocalData("events", updated);
    addChange("events", "delete", { object:e, section });
  };

  const moveEvent = (e, fromSection, toSection) => {
    const event = eventsData[fromSection]?.find((event) => event.id === e.id);
    const updated = {
      ...eventsData,
      [fromSection]: eventsData[fromSection].filter((event) => event.id !== e.id),
      [toSection]: [...eventsData[toSection], event]
    };
    updateLocalData("events", updated);
    addChange("events", "move", { object:e, fromSection, toSection });
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const undoChanges = () => {
    if (!window.confirm("Are you sure you want to discard all staged changes?")) return;
    updateLocalData("events", events);
    clearChanges("events");
    setNewEvents(null);
  };

  const renderEvent = (e, section) => {
    if (!e) return null;
    const isNew = newEvents?.includes(e.id);
    return (
      <div
        key={e.id}
        className={`${styles.eventCard} ${isNew ? styles.newEvent : ""}`}
        onClick={() => {navigate(`${window.location.pathname}/${e.id}`)}}
      >
        <div className={styles.eventTop}>
          <h3 className={styles.eventTitle}>{e.title}</h3>
          {(e._preview || e.logo) && (
            <img
              src={e._preview || e.logo}
              alt="Event Logo"
              className={styles.eventLogo}
            />
          )}
        </div>
        <p className={styles.eventDate}>{new Date(e.date).toLocaleString()}</p>
        <p className={styles.eventLocation}>{e.eventType} at {e.location}</p>
        <p className={styles.eventDescription}>{e.description}</p>
        {section === "upcomingEvents" && <p className={styles.ticketLink}>
          <a href={e.ticketsLink} target="_blank">{e.ticketsLink}</a>
          </p>}

        {e.sponsors && e.sponsors.length > 0 ? (
        <div className={styles.logoContainer}>
          {
            e.sponsors.map((sponsorId) => {
              const s = getSponsor(sponsorId);
              if (!s) return null;
              return (
                <img
                  key={s.id}
                  src={s.logoUrl}
                  alt={s.name}
                  className={styles.sponsorLogo}
                />
              );
            })
          } </div>) : (
            <p className="empty-msg">No sponsors</p>
          )}

        <div className={styles.eventButtons}>
          <div className="button-container">
            <button className="secondaryBtn" onClick={(event) => {event.stopPropagation(); handleEdit(e, section)}}>
              Edit
            </button>
            <button className="secondaryBtn" onClick={(event) => {event.stopPropagation(); handleDelete(e, section)}}>
              Delete
            </button>
          </div>
          {section === "upcomingEvents" && (
            <button className="primaryBtn" onClick={(event) => {event.stopPropagation(); moveEvent(e, "upcomingEvents", "pastEvents")}}>
              Move to Past
            </button>
          )}
          {section === "pastEvents" && (
            <button className="primaryBtn" onClick={(event) => {event.stopPropagation(); moveEvent(e, "pastEvents", "upcomingEvents")}}>
              Move to Upcoming
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.eventsPage}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>All Events</h1>
          <p>Manage upcoming and past events for Hack Sussex.</p>
        </div>
        <div className={styles.headerButtons}>
          <button
            className="secondaryBtn"
            disabled={!stagedChanges.events?.length}
            onClick={undoChanges}
          >
            Undo Changes
          </button>
          <button className="secondaryBtn" onClick={handleCreate}>
            + New Event
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

      <section className={styles.eventsSection}>
        <h2>Upcoming Events ({eventsData.upcomingEvents.length})</h2>
        {eventsData.upcomingEvents.length === 0 ? (
          <p className={"empty-msg"}>No upcoming events.</p>
        ) : (
          <div className={styles.eventsGrid}>
            {eventsData.upcomingEvents.map((e) => renderEvent(e, "upcomingEvents"))}
          </div>
        )}
      </section>

      <section className={styles.eventsSection}>
        <h2>Past Events ({eventsData.pastEvents.length})</h2>
        {eventsData.pastEvents.length === 0 ? (
          <p className={"empty-msg"}>No past events.</p>
        ) : (
          <div className={styles.eventsGrid}>
            {eventsData.pastEvents.map((e) => renderEvent(e, "pastEvents"))}
          </div>
        )}
      </section>
    </div>
  );
};

export default EventsPage;
