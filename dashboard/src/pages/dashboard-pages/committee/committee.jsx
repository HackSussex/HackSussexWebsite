// src/pages/committee/CommitteePage.jsx
import React, { useEffect, useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import useStaging from "../../../hooks/useStaging";
import useToken from "../../../hooks/useToken";
import { writeJsonFile } from "../../../util/githubWrite";
import { useOverlay } from "../../../hooks/useOverlay";
import styles from "./committee.module.css";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../../components/loading";
import { roles } from "../../../config/roles";
import { committeeYears } from "../../../config/years";

export const MemberForm = ({ formTitle, formData, closeOverlay, saveMember, isEdit }) => {
  const [data, setData] = useState(formData || {});
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(formData?._preview || formData?.image || "");

  const hasChanges = JSON.stringify({
    name: formData.name,
    role: formData.role,
    years: formData.years,
    github: formData.github,
    linkedin: formData.linkedin,
    instagram: formData.instagram,
    image: formData.image
  }) !== JSON.stringify({
    name: data.name,
    role: data.role,
    years: data.years,
    github: data.github,
    linkedin: data.linkedin,
    instagram: data.instagram,
    image: data.image
  });

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfileFile(file);
    setProfilePreview(previewUrl);
    setData({
      ...data,
      image: file.name,
      _profileFile: file,
      _preview: previewUrl
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveMember(data);
    closeOverlay();
  };

  return (
    <form className={styles.form} onSubmit={handleSave}>
      <h2>{formTitle}</h2>
      <div className={styles.memberForm}>
        <div className={styles.inputs}>
          <input
            placeholder="Name"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          
          <select
            value={data.role || ""}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            required
          >
            <option value="" disabled>Select Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

<div className={styles.yearCheckboxList}>
  {committeeYears.map((yr) => {
    const isChecked = data.years?.includes(yr);

    return (
      <label key={yr} className={styles.yearCheckboxItem} onClick={() => {
            const updatedYears = isChecked
              ? data.years.filter(y => y !== yr)
              : [...(data.years || []), yr];

              setData({ ...data, years: updatedYears });
            }}>
        <div 
          className={`${styles.customCheckbox} ${isChecked ? styles.checked : ''}`}
          onClick={() => {
            const updatedYears = isChecked
              ? data.years.filter(y => y !== yr)
              : [...(data.years || []), yr];

              setData({ ...data, years: updatedYears });
            }}
          >
            {isChecked && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path 
                  d="M2 7L5.5 10.5L12 3.5" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span>{yr}</span>
        </label>
      );
    })}
  </div>


          <input
            type="url"
            placeholder="GitHub URL"
            value={data.github || ""}
            onChange={(e) => setData({ ...data, github: e.target.value })}
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={data.linkedin || ""}
            onChange={(e) => setData({ ...data, linkedin: e.target.value })}
          />
          {/* <input
            type="url"
            placeholder="Instagram URL"
            value={data.instagram || ""}
            onChange={(e) => setData({ ...data, instagram: e.target.value })}
          /> */}
        </div>

        <div className={styles.profileUpload}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.svg"
            id="profileInput"
            style={{ display: "none" }}
            onChange={handleProfileChange}
          />
          <label htmlFor="profileInput" className={styles.profileLabel}>
            {profilePreview ? (
              <img src={profilePreview} alt="Profile Preview" className={styles.profilePreview} />
            ) : (
              <div className={styles.profilePlaceholder}>Click to upload profile picture</div>
            )}
          </label>
        </div>
      </div>

      <div className={styles.formButtons}>
        <button type="button" className="secondaryBtn" onClick={closeOverlay}>Cancel</button>
        <button
          type="submit"
          className="primaryBtn"
          disabled={
            !isEdit
              ? (!data.name || !data.role || !profileFile) 
              : !hasChanges
          }
        >
          {isEdit ? "Save Changes" : "Create Member"}
        </button>
      </div>
    </form>
  );
};


const CommitteePage = () => {
  const { data: fetchedData, loading, errorMsg } = useFetchData("committee.json");
  const token = useToken();
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges } = useStaging();
  const { openOverlay } = useOverlay();
  const navigate = useNavigate();

  const [newMembers, setNewMembers] = useState([]);

  if (loading || !localData?.committee) return  <LoadingScreen message={"loading committee"}/>;
  if (errorMsg) return <p className={styles.errorMsg}>{errorMsg}</p>;

  const membersData = localData.committee;

  const handleUndo = () => {
    if (!window.confirm("Are you sure you want to discard all staged changes?")) return;
    updateLocalData("committee", fetchedData); 
    clearChanges("committee");
    setNewMembers([]);
  };

  const handleCreate = () => {
    const newMember = { id: "mem_" + Math.random().toString(36).slice(2), name: "", role: "", years: [], image: "", pastCommittee: false };
    openOverlay(
      <MemberForm
        formTitle="Add New Member"
        formData={newMember}
        saveMember={(m) => {
          const updated = [...membersData, m];
          updateLocalData("committee", updated);
          addChange("committee", "create", { object: m });
          setNewMembers(prev => [...prev, m.id]);
        }}
        closeOverlay={() => openOverlay(null)}
        isEdit={false}
      />,
      newMember
    );
  };

  const handleEdit = (member) => {
    openOverlay(
      <MemberForm
        formTitle="Edit Member"
        formData={member}
        saveMember={(m) => {
          const updated = membersData.map((mem) => (mem.id === m.id ? m : mem));
          updateLocalData("committee", updated);
          addChange("committee", "edit", { object: m });
        }}
        closeOverlay={() => openOverlay(null)}
        isEdit={true}
      />,
      member
    );
  };

  const handleDelete = (member) => {
    const updated = membersData.filter((m) => m.id !== member.id);
    updateLocalData("committee", updated);
    addChange("committee", "delete", { object: member });
    setNewMembers(prev => prev.filter(nid => nid !== member.id));
  };

  const handleTogglePast = (member) => {
    const fromSection = member.pastCommittee ? "pastCommittee" : "currentCommittee";
    const toSection = member.pastCommittee ? "currentCommittee" : "pastCommittee";
    const updatedMember = { ...member, pastCommittee: !member.pastCommittee };
    const updated = membersData.map((m) => (m.id === member.id ? updatedMember : m));
    updateLocalData("committee", updated);
    addChange("committee", "edit", { object: updatedMember });
  };


  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const currentMembers = membersData.filter(m => !m.pastCommittee);
  const pastMembers = membersData.filter(m => m.pastCommittee);

  const pastMembersByYear = {};

  pastMembers.forEach(member => {
    (member.years || []).forEach(yearRange => {
      if (!pastMembersByYear[yearRange]) {
        pastMembersByYear[yearRange] = [];
      }
      pastMembersByYear[yearRange].push(member);
    });
  });

  const sortedYearKeys = Object.keys(pastMembersByYear)
    .sort((a, b) => {
      const aStart = parseInt(a.split("/")[0], 10);
      const bStart = parseInt(b.split("/")[0], 10);
      return bStart - aStart;
    });
    
  const renderMemberCard = (m) => (
    <div
      key={m.id}
      className={`${styles.memberCard} ${newMembers.includes(m.id) ? styles.newCard : ""}`}
      onClick={() => {navigate("/dashboard/committee/" + m.id)}}
    >

      {m._preview || m.image ? (
        <img src={m._preview || m.image} alt={m.name} className={styles.profilePicture} />
      ) : (
        <div className={styles.noProfile}>No picture</div>
      )}

      <div className={styles.committeeMember}>
        <h2>{m.name}</h2>
        <h3>{m.role} {m.year}</h3>
        {/* <p>
          {m.github && <a onClick={(e) => e.stopPropagation()} href={m.github} target="_blank" rel="noreferrer">GitHub</a>}{" "}
          {m.linkedin && <a onClick={(e) => e.stopPropagation()} href={m.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}{" "}
          {m.instagram && <a onClick={(e) => e.stopPropagation()} href={m.instagram} target="_blank" rel="noreferrer">Instagram</a>}
        </p> */}
        <div className={styles.cardButtons}>
          <button className="secondaryBtn" onClick={(e) => {e.stopPropagation(); handleEdit(m)}}>Edit</button>
          <button className="secondaryBtn" onClick={(e) => {e.stopPropagation(); handleDelete(m)}}>Delete</button>
          <button className="primaryBtn" onClick={(e) => {e.stopPropagation(); handleTogglePast(m)}}>
            Move {m.pastCommittee ? "Current" : "Past"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.committeePage}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>Committee Members</h1>
          <p>Manage committee members and their profiles</p>
        </div>
        <div className={styles.headerButtons}>
          <button
            className="secondaryBtn"
            onClick={handleUndo}
            disabled={!stagedChanges.committee?.length}
          >
            Undo Changes
          </button>
          <button className="secondaryBtn" onClick={handleCreate}>+ New Member</button>
          <button
            className="primaryBtn"
            disabled={!stagedChanges.committee?.length}
            onClick={() => {commitChanges(["committee"])}}
          >
            Commit Changes
          </button>
        </div>
      </div>

      <section className={styles.committeeSection}>
      <h2>Current Committee ({currentMembers.length})</h2>
      {currentMembers.length > 0 ? (
        <div className={styles.membersGrid}>
          {currentMembers.map(renderMemberCard)}
        </div>
      ) : (
        <p className="empty-msg">No current members</p>
      )}
      </section>

      <section className={styles.committeeSection}>
        <h2>Past Committee</h2>

        {sortedYearKeys.length === 0 && (
          <p className="empty-msg">No past members</p>
        )}

        {sortedYearKeys.map(year => (
          <div key={year} className={styles.yearGroup}>
            <h3 className={styles.yearHeader}>{year} ({pastMembersByYear[year].length})</h3>

            <div className={styles.membersGrid}>
              {pastMembersByYear[year].map(renderMemberCard)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CommitteePage;
