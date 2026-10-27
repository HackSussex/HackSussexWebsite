import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import useStaging from "../../../../hooks/useStaging";
import useToken from "../../../../hooks/useToken";
import { writeJsonFile } from "../../../../util/githubWrite";
import { useOverlay } from "../../../../hooks/useOverlay";
import { MemberForm } from "../committee";
import styles from "./committeeDetails.module.css";
import LoadingScreen from "../../../../components/loading";
import { FaArrowLeft } from "react-icons/fa";
import { GithubIcon, LinkedinIcon } from "lucide-react";

const CommitteeMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fetchedData, loading, errorMsg } = useFetchData("committee.json");
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges} = useStaging();
  const token = useToken();
  const { openOverlay } = useOverlay();
  const repo = process.env.REACT_APP_GITHUB_REPO;

  const [member, setMember] = useState(null);

  useEffect(() => {
    if (fetchedData && !localData?.committee) {
      updateLocalData("committee", fetchedData);
    }
  }, [fetchedData, localData?.committee, updateLocalData]);

  useEffect(() => {
    if (!localData?.committee) return;
    const foundMember = localData.committee.find((m) => String(m.id) === String(id));
    setMember(foundMember);
  }, [localData?.committee, id]);

  if (loading || !localData?.committee) return  <LoadingScreen message={"loading commitee member"}/>;
  if (errorMsg) return <p className={styles.errorMsg}>{errorMsg}</p>;
  if (!member) return <p>Committee member not found.</p>;

  const handleEdit = () => {
    openOverlay(
      <MemberForm
        formTitle="Edit Committee Member"
        formData={member}
        saveMember={(m) => {
          const updated = localData.committee.map((c) => (c.id === m.id ? m : c));
          updateLocalData("committee", updated);
          addChange("committee", "edit", { object: m });
          setMember(m);
        }}
        closeOverlay={() => openOverlay(null)}
        isEdit={true}
      />,
      member
    );
  };

  const handleDelete = () => {
    const updated = localData.committee.filter((c) => c.id !== member.id);
    updateLocalData("committee", updated);
    addChange("committee", "delete", { object:member });
    navigate("/dashboard/committee");
  };

  const undoChanges = () => {
    if (!window.confirm("Discard all staged changes?")) return;
    updateLocalData("committee", fetchedData);
    clearChanges("committee");
    const restoredMember = fetchedData.find((c) => String(c.id) === String(id));
    setMember(restoredMember);
  };

  return (
    <div className={styles.memberPage}>
      <div className={"header"}>
        <span className={"back-arrow-container"}>
            <FaArrowLeft
                className={"back-arrow"}
                onClick={() => navigate("/dashboard/committee")}
            />
            <h1>{member.name}</h1>
        </span>
      </div>

      {member.image && (
        <img
          src={member._preview || member.image}
          alt={member.name}
          className={styles.memberImage}
        />
      )}
      <p>
        <strong>Role:</strong> {member.role}
      </p>

      <p>
        <strong>Past committee:</strong> {member.pastCommittee ? "Yes" : "No"}
      </p>

      <p>
        <strong>Years in society:</strong> {member.years}
      </p>

      <ul className={styles.socialLinks}>
        {member.github && (
          <div className={styles.committeeLink}>
            <GithubIcon size={20}/>
            GitHub
            <a href={member.github} target="_blank" rel="noreferrer">
              {member.github}
            </a>
          </div>
        )}
        {member.linkedin && (
          <div className={styles.committeeLink}>
            <LinkedinIcon size={20}/>
            LinkedIn
            <a href={member.linkedin} target="_blank" rel="noreferrer">
              {member.linkedin}
            </a>
          </div>
        )}
      </ul>

      <div className={styles.bottomButtons}>
        <button
          className="secondaryBtn"
          disabled={!stagedChanges.committee?.length}
          onClick={undoChanges}
        >
          Undo Changes
        </button>
        <button className="secondaryBtn" onClick={handleEdit}>
          Edit Member
        </button>
        <button className="secondaryBtn" onClick={handleDelete}>
          Delete Member
        </button>
        <button
          className="primaryBtn"
          disabled={!stagedChanges.committee?.length}
          onClick={() => {commitChanges(["committee"])}}
        >
          Commit Changes
        </button>
      </div>
    </div>
  );
};

export default CommitteeMemberPage;
