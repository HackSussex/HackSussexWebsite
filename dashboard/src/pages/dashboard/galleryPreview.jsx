import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import { Image } from "lucide-react";
import useGallery from "../../hooks/useGallery";
import LoadingScreen from "../../components/loading";

const GalleryPreview = () => {
  const { images } = useGallery(); 
  const [randomImage, setRandomImage] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [totalImages, setTotalImages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!images || images.length === 0) return;

    const counts = {};
    let total = 0;

    images.forEach(img => {
      const category = img.category || "uncategorized";
      counts[category] = (counts[category] || 0) + 1;
      total += 1;
    });

    setCategoryCounts(counts);
    setTotalImages(total);

    const randomImg = images[Math.floor(Math.random() * images.length)];
    setRandomImage(randomImg.url);
  }, [images]);

  if (!images) return <div className={styles.gallery}>
    <LoadingScreen message="loading gallery" />
  </div>;

  return (
    <div className={styles.gallery}>
      <div
        className={styles.galleryPreview}
        style={{
          backgroundImage: randomImage ? `url(${randomImage})` : "none",
        }}
        onClick={() => navigate("/dashboard/gallery")}
      >
        <div className={styles.galleryOverlay}>
          <h1>{totalImages}</h1>
          <h3>Images</h3>
        </div>

        <div className={styles.galleryOverlayAlbums}>
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div className={styles.album} key={cat}>
              <Image size={18}/>
              <p>{cat}: {count}</p>
            </div>
          ))}
        </div>

        <div className={styles.bottomRightImg}>
          <Image />
        </div>
      </div>
    </div>
  );
};

export default GalleryPreview;
