// hooks/useStaging.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import useToken from "./useToken";
import { createCommit, writeFile, readJsonFile } from "../util/githubWrite";
import { useOverlay } from "./useOverlay";

const StagingContext = createContext();

export const StagingProvider = ({ children }) => {
  const [localData, setLocalData] = useState(null); // Start with null
  const [stagedChanges, setStagedChanges] = useState({});
  const token = useToken();
  const { startLoading, endLoading } = useOverlay();
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const [loadingData, setLoadingData] = useState(false);

  const loadData = async () => {
      if (!token) return;
      setLoadingData(true);
      const files = ["sponsors", "events", "committee", "siteData"];
      const newLocalData = {};

      for (const file of files) {
        try {
          const data = await readJsonFile(token, repo, `src/config/${file}.json`);
          newLocalData[file] = data || [];
        } catch (err) {
          console.error(`[Staging] Failed to load ${file}:`, err);
          newLocalData[file] = [];
        }
      }

      for (const file in stagedChanges) {
        const changes = stagedChanges[file];
        if (!changes || !newLocalData[file]) continue;

        let updated = Array.isArray(newLocalData[file]) ? [...newLocalData[file]] : { ...newLocalData[file] };

        for (const change of changes) {
          const obj = change.object || change.payload?.object || change.payload;
          if (!obj) continue;

          if (Array.isArray(updated)) {
            switch (change.type) {
              case "create": updated.push(obj); break;
              case "edit": updated = updated.map(e => e.id === obj.id ? obj : e); break;
              case "delete": updated = updated.filter(e => e.id !== obj.id); break;
            }
          } else {
            const targetKey = change.section || Object.keys(updated).find(k => Array.isArray(updated[k]));
            if (targetKey) {
              switch (change.type) {
                case "create": updated[targetKey].push(obj); break;
                case "edit": updated[targetKey] = updated[targetKey].map(e => e.id === obj.id ? obj : e); break;
                case "delete": updated[targetKey] = updated[targetKey].filter(e => e.id !== obj.id); break;
                case "move":
                  updated[change.fromSection] = updated[change.fromSection].filter(e => e.id !== obj.id);
                  updated[change.toSection].push(obj);
                  break;
              }
            } else if (change.type === "edit") {
              updated = { ...updated, ...obj };
            }
          }
        }

        newLocalData[file] = updated;
      }
      setLocalData(newLocalData);
      endLoading();
      setLoadingData(false);
    }; 


  useEffect(() => {loadData()}, [])

  const updateLocalData = (key, data) => {
    setLocalData(prev => ({ ...prev, [key]: data }));
  };

  const addChange = (file, type, payload = {}) => {
    const change = { type, ...payload };
    const obj = change.object || change.payload?.object || change.payload;
    if (!obj) return;

    // Cancel opposite moves
    if (type === "move" && change.fromSection && change.toSection) {
      const fileStaged = stagedChanges[file] || [];
      const cancellingIndex = fileStaged.findIndex(
        c => c.type === "move" &&
             c.object?.id === obj.id &&
             c.fromSection === change.toSection &&
             c.toSection === change.fromSection
      );
      if (cancellingIndex !== -1) {
        fileStaged.splice(cancellingIndex, 1);
        setStagedChanges(prev => ({ ...prev, [file]: fileStaged }));
        return;
      }
    }

    setStagedChanges(prev => {
      const fileChanges = prev[file] || [];
      const now = new Date().toISOString();
      return { ...prev, [file]: [...fileChanges, { ...change, timestamp: now }] };
    });
  };

  const clearChanges = (key) => {
    if (key) {
      setStagedChanges(prev => {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      });
    } else {
      setStagedChanges({});
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const generateFileName = (prefix, originalName) => {
    const ext = originalName.split(".").pop();
    const randomStr = Math.random().toString(36).slice(2, 10);
    return `${prefix}_${randomStr}.${ext}`;
  };

  const commitChanges = async (files) => {
    if (!token) return alert("No token found.");
    startLoading("Committing changes...");

    try {
      const filesToCommit = !files
        ? Object.keys(stagedChanges)
        : Array.isArray(files)
        ? files
        : [files];

      const commitFiles = [];

      for (const file of filesToCommit) {
        const githubData = await readJsonFile(token, repo, `src/config/${file}.json`);
        let updatedData = Array.isArray(githubData) ? [...githubData] : { ...githubData };
        const changes = stagedChanges[file] || [];

        for (const change of changes) {
          const obj = change.object || change.payload?.object || change.payload;
          if (!obj) continue;

          const fileFieldMapping = { sponsors: "_logoFile", events: "_logoFile", committee: "_profileFile" };
          const jsonKeyMapping = { sponsors: "logoUrl", events: "logo", committee: "image" };
          const field = fileFieldMapping[file];
          const jsonKey = jsonKeyMapping[file];

          if (field && obj[field]) {
            const filename = generateFileName(file, obj[field].name);
            const remotePath = `public/config_images/${file}/${filename}`;
            const base64 = await toBase64(obj[field]);
            await writeFile(token, repo, remotePath, base64);
            obj[jsonKey] = `https://raw.githubusercontent.com/${repo}/main/${remotePath}`;
            delete obj[field];
            delete obj._preview;
          }

          if (Array.isArray(updatedData)) {
            switch (change.type) {
              case "create": updatedData.push(obj); break;
              case "edit": updatedData = updatedData.map(e => e.id === obj.id ? obj : e); break;
              case "delete": updatedData = updatedData.filter(e => e.id !== obj.id); break;
            }
          } else {
            const targetKey = change.section || Object.keys(updatedData).find(k => Array.isArray(updatedData[k]));
            if (targetKey) {
              switch (change.type) {
                case "create": updatedData[targetKey].push(obj); break;
                case "edit": updatedData[targetKey] = updatedData[targetKey].map(e => e.id === obj.id ? obj : e); break;
                case "delete": updatedData[targetKey] = updatedData[targetKey].filter(e => e.id !== obj.id); break;
                case "move":
                  updatedData[change.fromSection] = updatedData[change.fromSection].filter(e => e.id !== obj.id);
                  updatedData[change.toSection].push(obj);
                  break;
              }
            } else if (change.type === "edit") {
              updatedData = { ...updatedData, ...obj };
            }
          }
        }

        commitFiles.push({
          path: `src/config/${file}.json`,
          content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedData, null, 2)))),
          encoding: "base64"
        });

        updateLocalData(file, updatedData);
      }

      await createCommit(token, repo, "main", commitFiles, "Commit staged config changes");
      clearChanges(filesToCommit);
    } catch (err) {
      console.error("[Staging] commitChanges failed:", err);
      alert("Failed to commit changes: " + err.message);
    } finally {
      endLoading();
      await loadData();
    }
  };

  return (
    <StagingContext.Provider
      value={{
        localData,
        stagedChanges,
        updateLocalData,
        addChange,
        clearChanges,
        commitChanges,
        loadingData
      }}
    >
      {children}
    </StagingContext.Provider>
  );
};

export default function useStaging() {
  return useContext(StagingContext);
}
