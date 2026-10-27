import React from "react";
import styles from "./video.module.css";
import messages from "./video.messages";
import { useSiteData } from "../../../hooks/useSiteData";
import TopHeader from "../../../components/topHeader/TopHeader";

const Video = () => {
  const { siteData } = useSiteData();

  return (
    <div className={styles.container}>
      <TopHeader
        title={messages.heading}
        ctaText={messages.description}
        ctaButtonLabel={messages.ctaButton}
        onCtaClick={() => window.open(siteData.youtube, "_blank")}
      />
      <div className={styles.videoGrid}>
        <iframe
          src="https://www.youtube.com/embed/XAIrb-ik6Xo"
          title="Hack Sussex Video 1"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />

        <iframe
          src="https://www.youtube.com/embed/I0szBuNtyLs"
          title="Hack Sussex Video 2"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Video;
