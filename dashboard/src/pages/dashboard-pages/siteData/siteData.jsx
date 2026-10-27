// src/pages/siteMetadata/SiteMetadataPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import useFetchData from "../../../hooks/useFetchData";
import useStaging from "../../../hooks/useStaging";
import { useOverlay } from "../../../hooks/useOverlay";
import styles from "./siteData.module.css";
import LoadingScreen from "../../../components/loading";

import {
  SiDiscord,
  SiTiktok,
  SiInstagram,
  SiLinkedin,
  SiYoutube,
  SiGithub,
  SiX,
  SiShopee
} from "react-icons/si";

const ICONS_MAP = {
  x: <SiX size={16} />,
  twitter: <SiX size={16} />,
  instagram: <SiInstagram size={16} />,
  linkedin: <SiLinkedin size={16} />,
  github: <SiGithub size={16} />,
  youtube: <SiYoutube size={16} />,
  discord: <SiDiscord size={16} />,
  tiktok: <SiTiktok size={16} />,
  merch: <SiShopee size={16} />
};

const EditSocialForm = ({ social, closeOverlay, save }) => {
  const [data, setData] = useState({ ...social });

  const handleChange = (platform, value) => {
    setData({ ...data, [platform]: value });
  };

  const isDirty = useMemo(() => {
    return JSON.stringify(data) !== JSON.stringify(social);
  }, [data, social]);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (isDirty) save(data);
        closeOverlay();
      }}
    >
      <h2>Edit Social Handles</h2>

      <div className={styles.socialGrid}>
        {Object.keys(data).map((platform) => (
          <div key={platform}>
            <label>
              {ICONS_MAP[platform] || null} {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </label>
            <input
              value={data[platform] || ""}
              onChange={(e) => handleChange(platform, e.target.value)}
              placeholder="Enter handle / username"
            />
          </div>
        ))}
      </div>

      <div className={styles.formButtons}>
        <button className="secondaryBtn" type="button" onClick={closeOverlay}>
          Cancel
        </button>
        <button className="primaryBtn" type="submit" disabled={!isDirty}>
          Save Changes
        </button>
      </div>
    </form>
  );
};

const SiteMetadataPage = () => {
  const { data, loading, errorMsg } = useFetchData("siteData.json");
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges } = useStaging();
  const { openOverlay } = useOverlay();

  if (loading || !localData?.siteData) return  <LoadingScreen message={"loading site data"}/>;
  if (errorMsg) return <p className="error-msg">{errorMsg}</p>;

  const social = localData?.siteData;

  const openEdit = () => {
    openOverlay(
      <EditSocialForm
        social={social}
        closeOverlay={() => openOverlay(null)}
        save={(updatedSocial) => {
          const changedFields = Object.fromEntries(
            Object.keys(updatedSocial)
              .filter((key) => updatedSocial[key] !== social[key])
              .map((key) => [key, updatedSocial[key]])
          );

          if (Object.keys(changedFields).length === 0) return;

          const newData = {
            ...localData.siteData,
            ...changedFields,
          };

          updateLocalData("siteData", newData);
          addChange("siteData", "edit", { object: changedFields });
        }}
      />
    );
  };

  const undoChanges = () => {
    if (!window.confirm("Discard all changes?")) return;
    updateLocalData("siteData", data);
    clearChanges("siteData");
  };

  return (
    <div className={styles.page}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>Site MetaData</h1>
          <p>Edit the platform usernames / handles used across the site.</p>
        </div>

        <div className={styles.headerButtons}>
          <button
            className="secondaryBtn"
            disabled={!stagedChanges.siteData?.length}
            onClick={undoChanges}
          >
            Undo Changes
          </button>
          <button className="secondaryBtn" onClick={openEdit}>
            Edit Handlers
          </button>
          <button
            className="primaryBtn"
            disabled={!stagedChanges.siteData?.length}
            onClick={() => commitChanges(["siteData"])}
          >
            Commit Changes
          </button>
        </div>
      </div>

      <div className={styles.socialDetails}>
        <h2>Social Media</h2>
        <ul className={styles.socialList}>
          {Object.entries(social).map(([platform, handle]) => {
            if (!handle) return null;
            return (
              <li key={platform} className={styles.socialItem}>
                <span className={styles.icon}>{ICONS_MAP[platform]}</span>
                <strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}</strong>:{" "}
                <a href={handle.startsWith("http") ? handle : `https://${handle}`} target="_blank" rel="noreferrer">
                  {handle}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SiteMetadataPage;
