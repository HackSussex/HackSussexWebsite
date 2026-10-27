import React from "react";
import useStaging from "../../hooks/useStaging";
import useGallery from "../../hooks/useGallery";
import useToken from "../../hooks/useToken";
import { writeJsonFile } from "../../util/githubWrite";

const StagingPage = () => {
  const {
    stagedChanges,
    clearChanges,
    setStagedChanges,
    updateLocalData,
    commitChanges
  } = useStaging();

  const {
    clearStaged,
    stagedImages,
    removeImage,
    commitImages,
  } = useGallery();

  const hasChanges =
    Object.values(stagedChanges).some(
      (arr) => Array.isArray(arr) && arr.length > 0
    ) || stagedImages.length > 0;

  const handleClear = () => {
    if (window.confirm("Discard ALL staged changes and staged images?")) {
      clearChanges();
      stagedImages.forEach((img) => removeImage(img.id));
    }
  };

  const handleCommitAll = async () => {
    if (!hasChanges) return alert("No staged changes to commit.");

    await commitChanges();
    await commitImages();
    clearStaged();
    clearChanges(); 
  };

  const renderChange = (change, entityType, idx) => {
    let text = "";

    if (change.type === "create") {
      const name = change.object?.title || change.object?.name || "Unknown";
      text = `CREATE - ${name} at ${change.timestamp}`;

    } else if (change.type === "move") {
      const name = change.object?.title || change.object?.name || "Unknown";
      text = `MOVED - ${name} from ${change.fromSection} to ${change.toSection} at ${change.timestamp}`;

    } else if (change.type === "edit") {
      const entityName = change.object?.title || change.object?.name || "Unknown";
      const socialKeys = ["twitter", "github", "facebook", "linkedin", "instagram"];
      const changedSocial = socialKeys.filter(key => key in change.object);
      let details = "";

      if (change.event) {
        details += ` Section: ${change.event.section || "N/A"}`;
      } else if (changedSocial.length > 0) {
        details += `${changedSocial.join(", ")}`;
      }

      text = `EDIT - ${changedSocial.length === 0 ? entityName : ""}${details} at ${change.timestamp}`;

    } else if (change.type === "delete") {
      const entityName = change.object?.title || change.object?.name || "Unknown";
      text = `DELETE - ${entityName} ${change.section ? `(Section: ${change.section})` : ""} at ${change.timestamp}`;

    } else {
      text = JSON.stringify(change);
    }

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{text}</span>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Staging</h1>

      {!hasChanges && <p className="empty-msg">No staged changes.</p>}

      {Object.entries(stagedChanges).map(([entityType, changes]) => (
        changes.length > 0 && (
          <div key={entityType} style={{ marginBottom: "1.5rem" }}>
            <h2>{entityType} ({changes.length})</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {changes.map((c, idx) => (
                <li key={idx} style={{ marginBottom: "0.5rem" }}>
                  {renderChange(c, entityType, idx)}
                </li>
              ))}
            </ul>
          </div>
        )
      ))}

     {stagedImages.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
            <h2>Gallery Images</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>
            {stagedImages.map((img) => {
                const action = img.type === "delete" ? "DELETE" : "CREATE";
                const name = img.filename || img.file?.name || "unknown";
                const cat = img.category || "none";

                return (
                <li
                    key={img.id}
                    style={{
                    marginBottom: "0.5rem",
                    fontFamily: "monospace",
                    fontSize: "0.95rem"
                    }}
                >
                    {action} – {name} ({cat})
                </li>
                );
            })}
            </ul>
        </div>
        )}


      {hasChanges && (
        <div className="button-container left">
          <button onClick={handleClear} className="secondaryBtn">
            Clear All Staged Changes
          </button>

          <button onClick={handleCommitAll} className="primaryBtn">
            Commit All
            {" "}
            (
              {Object.values(stagedChanges).reduce(
                (a, b) => a + b.length,
                0
              ) + stagedImages.length}
            )
          </button>
        </div>
      )}
    </div>
  );
};

export default StagingPage;
