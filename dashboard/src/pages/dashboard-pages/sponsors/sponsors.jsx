import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import useStaging from "../../../hooks/useStaging";
import useToken from "../../../hooks/useToken";
import { writeJsonFile } from "../../../util/githubWrite";
import { useOverlay } from "../../../hooks/useOverlay";
import styles from "./sponsors.module.css";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loading";

export const SponsorForm = ({ formTitle, formDescription, formData, closeOverlay, saveSponsor, isEditing }) => {
  const [data, setData] = useState(formData || {});
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(formData?._preview || formData?.logoUrl || "");

  const handleLogoChange = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const previewUrl = URL.createObjectURL(file);
      setLogoFile(file);
      setLogoPreview(previewUrl);

      setData({
        ...data,
        logoUrl: file.name,
        _logoFile: file,
        _preview: previewUrl
      });
    } catch (err) {
      console.error("[SponsorForm] ERROR reading logo:", err);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      saveSponsor(data);
    } catch (err) {
      console.error("[SponsorForm] ERROR saving sponsor:", err);
    }

    try {
      closeOverlay();
    } catch (err) {
      console.error("[SponsorForm] ERROR closing overlay:", err);
    }
  };

  const isUnchanged = JSON.stringify(data) === JSON.stringify(formData);

  return (
    <form className={styles.form} onSubmit={handleSave}>
      <div>
        <h2>{formTitle}</h2>
        <p>{formDescription}</p>
      </div>
      <div className={styles.sponsorForm}>
        <div className={styles.inputs}>
          <input
            placeholder="Sponsor Name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />

          <input
            type="url"
            placeholder="Website URL"
            value={data.website || ""}
            onChange={(e) => setData({ ...data, website: e.target.value })}
          />
        </div>

        <div className={styles.logoUpload}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            id="logoInput"
            style={{ display: "none" }}
            onChange={handleLogoChange}
          />
          <label htmlFor="logoInput" className={styles.logoLabel}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" className={styles.logoPreview} />
            ) : (
              <div className={styles.logoPlaceholder}>Click to upload logo</div>
            )}
          </label>
        </div>
      </div>

      <div className={styles.formButtons}>
        <button type="button" className="secondaryBtn" onClick={closeOverlay}>Cancel</button>
        <button
          type="submit"
          className="primaryBtn"
          disabled={isEditing ? isUnchanged : !data.name || !data.website || !logoFile}
        >
          {isEditing ? "Save Sponsor" : "Add Sponsor"}
        </button>
      </div>
    </form>
  );
};

const SponsorsPage = () => {
  const { data: fetchedData, loading, errorMsg } = useFetchData("sponsors.json");
  const token = useToken();
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges, loadingData } = useStaging();
  const { openOverlay } = useOverlay();
  const [newSponsors, setNewSponsors] = useState([]);
  const navigate = useNavigate();

  if (loading || !localData?.sponsors || loadingData) return  <LoadingScreen message={"loading sponsors"}/>;
  if (errorMsg) return <p className={styles.errorMsg}>{errorMsg}</p>;

  const sponsorsData = Array.isArray(localData.sponsors)
    ? localData.sponsors
    : Object.values(localData.sponsors || {});

  const handleUndo = () => {
    try {
      if (!window.confirm("Are you sure you want to discard all staged changes?")) return;
      updateLocalData("sponsors", fetchedData);
      clearChanges("sponsors");
      setNewSponsors([]);
    } catch (err) {
      console.error("[Sponsors] ERROR during undo:", err);
    }
  };

  const handleCreate = () => {
    const newSponsor = {
      id: "sponsor_" + Math.random().toString(36).slice(2),
      name: "",
      website: "",
      logoUrl: ""
    };

    try {
      openOverlay(
        <SponsorForm
          formTitle="Add New Sponsor"
          formDescription="You must commit the new sponsor before refrencing it in an event"
          formData={newSponsor}
          saveSponsor={(s) => {
            try {
              const updated = [...sponsorsData, s];
              updateLocalData("sponsors", updated);
              addChange("sponsors", "create", { object: s });
              setNewSponsors((prev) => [...prev, s.id]);
            } catch (err) {
              console.error("[Sponsors] ERROR creating sponsor:", err);
            }
          }}
          closeOverlay={() => openOverlay(null)}
        />,
        newSponsor
      );
    } catch (err) {
      console.error("[Sponsors] ERROR opening create overlay:", err);
    }
  };

  const handleEdit = (sponsor) => {
    try {
      openOverlay(
        <SponsorForm
          formTitle="Edit Sponsor"
          formDescription="Edit a sponsors name, image or website link"
          formData={sponsor}
          isEditing={true}
          saveSponsor={(s) => {
            try {
              const updated = sponsorsData.map((sp) => (sp.id === s.id ? s : sp));
              updateLocalData("sponsors", updated);
              addChange("sponsors", "edit", { object: s });
            } catch (err) {
              console.error("[Sponsors] ERROR editing sponsor:", err);
            }
          }}
          closeOverlay={() => openOverlay(null)}
        />,
        sponsor
      );
    } catch (err) {
      console.error("[Sponsors] ERROR opening edit overlay:", err);
    }
  };

  const handleDelete = (sponsor) => {
    try {
      const eventsData = Array.isArray(localData.events) 
        ? localData.events 
        : localData.events || {};

      let affectedEventsCount = 0;
      Object.keys(eventsData).forEach((section) => {
        if (Array.isArray(eventsData[section])) {
          affectedEventsCount += eventsData[section].filter((event) => 
            event.sponsors?.includes(sponsor.id)
          ).length;
        }
      });

      let confirmMessage = "";
      if (affectedEventsCount > 0) {
        confirmMessage = `This sponsor is referenced in ${affectedEventsCount} event(s). Deleting it will remove it from all those events. This change cannot be easily reverted after committing. Are you sure you want to continue?`;
      } else {
        confirmMessage = "Are you sure you want to delete this sponsor? This cannot be easily reverted after committing.";
      }

      if (!window.confirm(confirmMessage)) return;

      const updatedSponsors = sponsorsData.filter((s) => s.id !== sponsor.id);
      updateLocalData("sponsors", updatedSponsors);

      addChange("sponsors", "delete", { object: sponsor });

      const updatedEvents = { ...eventsData };
      Object.keys(updatedEvents).forEach((section) => {
        if (Array.isArray(updatedEvents[section])) {
          updatedEvents[section] = updatedEvents[section].map((event) => {
            if (!event.sponsors?.includes(sponsor.id)) return event;
            const newSponsors = event.sponsors.filter((id) => id !== sponsor.id);
            const newEvent = { ...event, sponsors: newSponsors };
            addChange("events", "edit", { object: newEvent });
            return newEvent;
          });
        }
      });

      updateLocalData("events", updatedEvents);

      setNewSponsors((prev) => prev.filter((nid) => nid !== sponsor.id));

    } catch (err) {
      console.error("[Sponsors] ERROR deleting sponsor:", err);
    }
  };

  return (
    <div className={styles.sponsorsPage}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>All Sponsors ({sponsorsData.length})</h1>
          <p>Upload new sponsors and their branding</p>
        </div>
        <div className={styles.headerButtons}>
          <button
            className="secondaryBtn"
            onClick={handleUndo}
            disabled={!stagedChanges.sponsors?.length}
          >
            Undo Changes
          </button>
          <button className="secondaryBtn" onClick={handleCreate}>+ New Sponsor</button>
          <button
            className="primaryBtn"
            disabled={!stagedChanges.sponsors?.length}
            onClick={() => {
              try {
                commitChanges(["sponsors"]);
              } catch (err) {
                console.error("[Sponsors] ERROR committing changes:", err);
              }
            }}
          >
            Commit Changes
          </button>
        </div>
      </div>

      <div className={styles.sponsorsGrid}>
        {sponsorsData.length === 0 ? (
          <p className={"empty-msg"}>No sponsors available.</p>
        ) : (
          sponsorsData.map((s) => (
            <div
              key={s.id}
              className={`${styles.sponsorCard} ${newSponsors.includes(s.id) ? styles.newCard : ""}`}
              onClick={() => { navigate("/dashboard/sponsors/" + s.id); }}
            >
              <h3>{s.name}</h3>
              {s._preview || s.logoUrl ? (
                <img src={s._preview || s.logoUrl} alt={s.name} className={styles.sponsorLogo} />
              ) : <div className={styles.noLogo}>No logo</div>}
              <div className={styles.cardButtons}>
                <button className="secondaryBtn" onClick={(e) => { e.stopPropagation(); handleEdit(s); }}>Edit</button>
                <button className="primaryBtn" onClick={(e) => { e.stopPropagation(); handleDelete(s); }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SponsorsPage;
