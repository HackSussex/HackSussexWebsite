import React, { useState, useEffect } from "react";
import styles from "./gallery.module.css";
import messages from "./gallery.messages";

// Automatically import all images
const importAll = (r) => r.keys().map(r);
const allImagesRaw = importAll(
  require.context("../../assets/gallery", false, /\.(png|jpe?g|gif)$/),
);

const allImages = allImagesRaw.map((img) => {
  const src = img.default || img;
  const filename = src.split("/").pop();
  const category = filename.includes("_")
    ? filename.split("_")[0]
    : "uncategorized";

  return { src, category };
});

const IMAGES_PER_PAGE = 24;

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(null);

  // Categories
  const categories = Array.from(new Set(allImages.map((img) => img.category)));

  // Filter images
  const filteredImages =
    selectedCategory === "all"
      ? allImages
      : allImages.filter((img) => img.category === selectedCategory);

  // Pagination
  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + IMAGES_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{messages.title}</h1>
      <p>{messages.description}</p>

      {/* Filters */}
      <div className={styles.filters}>
        <button
          onClick={() => setSelectedCategory("all")}
          className={selectedCategory === "all" ? styles.active : "secondary"}
        >
          {messages.allCategory}
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? styles.active : "secondary"}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {paginatedImages.map((img) => (
          <button
            key={img.src}
            className={styles.card}
            onClick={() => setActiveImage(img.src)}
          >
            <img src={img.src} alt="" className={styles.image} />
          </button>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* LIGHTBOX OVERLAY */}
      {activeImage && (
        <div className={styles.overlay} onClick={() => setActiveImage(null)}>
          <img
            src={activeImage}
            alt=""
            className={styles.overlayImage}
            onClick={(e) => e.stopPropagation()}
          />
          <button className={styles.close} onClick={() => setActiveImage(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
