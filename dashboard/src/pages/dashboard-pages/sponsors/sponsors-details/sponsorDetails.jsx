import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchData from "../../../../hooks/useFetchData";
import useStaging from "../../../../hooks/useStaging";
import useToken from "../../../../hooks/useToken";
import { writeJsonFile } from "../../../../util/githubWrite";
import { useOverlay } from "../../../../hooks/useOverlay";
import { SponsorForm } from "../sponsors";
import styles from "./sponsorDetails.module.css";
import LoadingScreen from "../../../../components/loading";
import { FaArrowLeft } from "react-icons/fa";

const SponsorDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: fetchedSponsors, loading, errorMsg } = useFetchData("sponsors.json");
  const { localData, updateLocalData, stagedChanges, addChange, clearChanges, commitChanges} = useStaging();
  const token = useToken();
  const { openOverlay } = useOverlay();
  const repo = process.env.REACT_APP_GITHUB_REPO;

  const [sponsor, setSponsor] = useState(null);

  useEffect(() => {
    if (fetchedSponsors && !localData?.sponsors) {
      updateLocalData("sponsors", fetchedSponsors);
    }
  }, [fetchedSponsors, localData?.sponsors, updateLocalData]);

  useEffect(() => {
    if (!localData?.sponsors) return;
    const foundSponsor = localData.sponsors.find((s) => String(s.id) === String(id));
    setSponsor(foundSponsor);
  }, [localData?.sponsors, id]);

  if (loading || !localData?.sponsors) return  <LoadingScreen message={"loading sponsor"}/>;
  if (errorMsg) return <p className={styles.errorMsg}>{errorMsg}</p>;
  if (!sponsor) return <p>Sponsor not found.</p>;

  const handleEdit = () => {
    openOverlay(
      <SponsorForm
        formTitle="Edit Sponsor"
        formData={sponsor}
        isEditing={true}
        saveSponsor={(s) => {
          const updated = localData.sponsors.map((sp) => (sp.id === s.id ? s : sp));
          updateLocalData("sponsors", updated);
          addChange("sponsors", "edit", { object: s });
          setSponsor(s);
        }}
        closeOverlay={() => openOverlay(null)}
      />,
      sponsor
    );
  };

  const handleDelete = () => {
    const updated = localData.sponsors.filter((s) => s.id !== sponsor.id);
    updateLocalData("sponsors", updated);
    addChange("sponsors", "delete", { object: sponsor });
    navigate("/dashboard/sponsors");
  };

  const undoChanges = () => {
    if (!window.confirm("Discard all staged changes?")) return;
    updateLocalData("sponsors", fetchedSponsors);
    clearChanges("sponsors");
    setSponsor(fetchedSponsors.find((s) => String(s.id) === String(id)));
  };

  return (
    <div className={styles.sponsorPage}>
      <div className={"header"}>
        <span className={"back-arrow-container"}>
            <FaArrowLeft
                className={"back-arrow"}
                onClick={() => navigate("/dashboard/sponsors")}
            />
            <h1>{sponsor.name}</h1>
        </span>
      </div>

      {sponsor.logoUrl || sponsor._preview ? (
        <img
          src={sponsor._preview || sponsor.logoUrl}
          alt={sponsor.name}
          className={styles.sponsorLogo}
        />
      ) : (
        <p>No logo uploaded.</p>
      )}

      {sponsor.website && (
        <p>
          <strong>Website:</strong>{" "}
          <a href={sponsor.website} target="_blank" rel="noreferrer">
            {sponsor.website}
          </a>
        </p>
      )}

      <div className={styles.bottomButtons}>
        <button
          className="secondaryBtn"
          disabled={!stagedChanges.sponsors?.length}
          onClick={undoChanges}
        >
          Undo Changes
        </button>
        <button className="secondaryBtn" onClick={handleEdit}>
          Edit Sponsor
        </button>
        <button className="secondaryBtn" onClick={handleDelete}>
          Delete Sponsor
        </button>
        <button
          className="primaryBtn"
          disabled={!stagedChanges?.sponsors?.length}
          onClick={() => {commitChanges(["sponsors"])}}
        >
          Commit Changes
        </button>
      </div>
    </div>
  );
};

export default SponsorDetailsPage;
