import LoadingScreen from "../../../components/loading";
import React, { useEffect, useState } from "react";
import styles from "./gallery.module.css";
import useGallery from "../../../hooks/useGallery";
import { eventList } from "../../../config/events";
import { useOverlay } from "../../../hooks/useOverlay";

const categories = [
  "hackathon",
  "gamejam",
  "codesocial",
  "codersCup",
  "leetcoding",
  "misc",
  "pawnSussex",
  "robotics",
];

const StagedPreviewItem = ({ img, removeStaged }) => {
  const [src, setSrc] = useState("");
  const [exists, setExists] = useState(true);

  useEffect(() => {
    if (img.file) {
      const objectUrl = URL.createObjectURL(img.file);
      setSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    
    if (img.type === "delete" && img.url) {
      setSrc(img.url);
    }
  }, [img.file, img.type, img.url]);

  if (!exists) {
    return (
      <div className={styles.notAvailable}>
        <p>Image not available</p>
      </div>
    );
  }

  return (
    <div className={`${styles.stagedItem} ${img.type === "delete" ? styles.deleting : styles.creating}`}>
      <img
        src={src}
        alt={img.filename}
        onError={() => setExists(false)}
      />
      <p>
        {img.type.toUpperCase()} — {img.filename} ({img.category})
      </p>
      <button onClick={() => removeStaged(img.id)} className="secondaryBtn">
        Undo
      </button>
    </div>
  );
};

const UploadedItem = ({ img, stageDelete, className }) => {
  const [exists, setExists] = useState(true);

  if (!exists) {
    return (
      <div className={styles.notAvailable}>
        <p>Image not available</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={img.url}
        alt={img.filename}
        className={className}
        onError={() => setExists(false)}
      />
      <button className="secondaryBtn" onClick={() => stageDelete(img)}>
        Delete
      </button>
    </div>
  );
};

export const UploadImageForm = ({ closeOverlay, addImage }) => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!files.length || !category)
      return alert("Select files + category");

    files.forEach(file => {
      const ext = file.name.split(".").pop();
      const randomStr = Math.random().toString(36).slice(2, 8);
      const filename = `${category}_${randomStr}.${ext}`;
      addImage({ file, category, filename, type: "create" });
    });

    closeOverlay();
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form className={styles.uploadForm} onSubmit={handleSubmit}>
      <h2>Upload and Categorise Images</h2>

      <div className={styles.formGroup}>
        <label>Image Files</label>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.svg"
          multiple
          onChange={(e) => setFiles([...e.target.files])}
        />
      </div>

      {files.length > 0 && (
        <div className={styles.previewContainer}>
          {files.map((file, i) => (
            <div className={styles.previewItem} key={i}>
              <img src={URL.createObjectURL(file)} alt="" />
              <button
                type="button"
                className="secondaryBtn"
                onClick={() => removeFile(i)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.formGroup}>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select category</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className={styles.formButtons}>
        <button type="button" className="secondaryBtn" onClick={closeOverlay}>
          Cancel
        </button>
        <button type="submit" className="primaryBtn">Stage Images</button>
      </div>
    </form>
  );
};


const Gallery = () => {
  const { openOverlay } = useOverlay();
  const { stagedImages, loading, commitImages, removeStaged, images: realImages, addImage, stageDelete, clearStaged } = useGallery();

  const hasStaged = stagedImages.length > 0;

  const FAKE_DATA = false;

  const NUM_FAKE_IMAGES = 65;
  const categoriesList = eventList;

const images = FAKE_DATA
  ? Array.from({ length: NUM_FAKE_IMAGES }).map((_, i) => {
      const category = categoriesList[i % categoriesList.length];
      return {
        url: `https://picsum.photos/seed/${i}/200/150`,
        filename: `fake_${i}.jpg`,
        category,
      };
    })
  : (realImages || []).filter(img => 
      !stagedImages.some(staged => 
        staged.type === "delete" && staged.filename === img.filename
      )
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("");

  const filteredImages = images?.filter(img => !filterCategory || (img.category || "misc") === filterCategory);

  const PAGE_SIZE = 25;
  const totalPages = Math.ceil(filteredImages.length / PAGE_SIZE);
  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  
  const stagedCreateImages = stagedImages.filter(img => img.type === "create");
  const hasStagedCreate = stagedCreateImages.length > 0;

  if (loading) return(
    <LoadingScreen message="loading gallery" />
  );

  return (
    <div className={styles.gallery}>
      {/* HEADER */}
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>Gallery Images</h1>
          <p>View, create and delete images in the gallery</p>
        </div>
        <div className="button-container">
          <button className="secondaryBtn" onClick={clearStaged}>Undo Changes</button>
          <button className="secondaryBtn" onClick={() => openOverlay(
            <UploadImageForm closeOverlay={() => openOverlay(null)} addImage={addImage} />
          )}>
            + Add Images
          </button>
          <button className="primaryBtn" disabled={!hasStaged} onClick={commitImages}>
            Commit Changes
          </button>
        </div>
      </div>

    <h2>Staged Changes ({stagedImages.length})</h2>
    <div className={styles.stagedScroll}>
      {hasStaged ? (
        [...stagedImages]        
          .reverse()
          .map((img) => (
            <StagedPreviewItem
              key={img.id} 
              img={img}
              removeStaged={removeStaged}
            />
          ))
      ) : (
        <p className="empty-msg">No staged changes.</p>
      )}
    </div>


      {/* Filter */}
      <div className={styles.filterContainer}>
        <h2>Uploaded Images ({images.length})</h2>
        <select
         className="secondaryBtn"
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All</option>
          {Array.from(new Set(images.map(img => img.category || "misc"))).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Paginated Images */}
      <div className={styles.uploadedScroll}>
        {paginatedImages.length > 0 ? (
          [...paginatedImages]
          .reverse()
          .map((img, index) =>
            <UploadedItem
              key={index}
              img={img}
              stageDelete={stageDelete}
              className={styles.uploadedItemWrapper}
            />
          )
        ) : (
          <p className="empty-msg">No uploaded images.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.pageControls}>
          <button className="secondaryBtn" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="secondaryBtn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
