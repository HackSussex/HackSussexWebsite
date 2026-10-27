// GalleryProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import useToken from "./useToken";
import { createCommit } from "../util/githubWrite";
import { useOverlay } from "./useOverlay";

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [images, setImages] = useState([]);     
  const [stagedImages, setStagedImages] = useState([]); 
  const token = useToken();
  const { startLoading, endLoading } = useOverlay();
  const repo = process.env.REACT_APP_GITHUB_REPO;
  const [loading, setLoading] = useState(true);

  const fetchGalleryImages = async () => {
    if (!token) return;
    
    setImages(null);
    setLoading(true);

    await new Promise((resolve) => {setTimeout(resolve, 1000)})

    try {
      const url = `https://api.github.com/repos/${repo}/contents/src/assets/gallery?t=${Date.now()}`;
      const res = await fetch(url, {
        headers: { 
          Authorization: `token ${token}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch gallery folder");
      const data = await res.json();

      const files = data
        .filter(item => item.type === "file")
        .map(item => ({
          filename: item.name,
          // Add cache-busting parameter to download URLs
          url: `${item.download_url}?t=${Date.now()}`,
          category: item.name.split("_")[0] 
        }));

      setImages(files);
    } catch (err) {
      console.error("Error fetching gallery images:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const clearStaged = () => setStagedImages([]);

  const addImage = ({ file, category, filename }) => {
    const id = crypto.randomUUID();
    setStagedImages(prev => [
      ...prev,
      { id, type: "create", file, category, filename }
    ]);
  };

  const stageDelete = (img) => {
    setImages(prev => prev.filter(i => i.filename !== img.filename));
    
    setStagedImages(prev => [
      ...prev,
      { id: crypto.randomUUID(), type: "delete", ...img }
    ]);
  };

  const removeStaged = (id) => {
    const removed = stagedImages.find(s => s.id === id);
    if (removed?.type === "delete") {
      setImages(prev => [...prev, { filename: removed.filename, url: removed.url, category: removed.category }]);
    }
    setStagedImages(prev => prev.filter(x => x.id !== id));
  };

  const commitImages = async () => {
    if (!token || stagedImages.length === 0) return;
    startLoading("Committing gallery changes...");

    try {
      const commitFiles = [];

      for (const img of stagedImages) {
        if (img.type === "create") {
          const reader = new FileReader();
          const base64 = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result.split(",")[1]); 
            reader.onerror = reject;
            reader.readAsDataURL(img.file);
          });
          const path = `src/assets/gallery/${img.filename}`;
          commitFiles.push({ path, content: base64, encoding: "base64" });
        }

        if (img.type === "delete") {
          const path = `src/assets/gallery/${img.filename}`;
          commitFiles.push({ path, delete: true });
        }
      }

      await createCommit(token, repo, "main", commitFiles, "Commit staged gallery changes");
      setStagedImages([]);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      endLoading();
      fetchGalleryImages();
    } catch (err) {
      console.error(err);
      alert("Error committing images: " + err.message);
    } finally {
      endLoading();
    }
  };

  return (
    <GalleryContext.Provider
      value={{
        images,
        stagedImages,
        loading,
        addImage,
        stageDelete,
        removeStaged,
        commitImages,
        clearStaged,
        fetchGalleryImages
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export default function useGallery() {
  return useContext(GalleryContext);
}