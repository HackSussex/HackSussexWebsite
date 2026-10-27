// src/pages/dashboard/index.jsx
import React, { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";
import styles from "./dashboard.module.css";
import { useRepoStats } from "../../hooks/useRepoStats";
import { Calendar, Users, Gift, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GalleryPreview from "./galleryPreview";
import AnalyticsChart from "./analyticsCharts";
import LoadingScreen from "../../components/loading";

import { SiDiscord, SiTiktok, SiX, SiInstagram, SiLinkedin, SiYoutube, SiShopee } from "react-icons/si";

export const SOCIAL_ICONS = {
  x: SiX,
  instagram: SiInstagram,
  linkedin: SiLinkedin,
  discord: SiDiscord,
  youtube: SiYoutube,
  tiktok: SiTiktok,
  merch: SiShopee
};

const Dashboard = () => {
  const { data: eventsData, loading: eventsLoading } = useFetchData("events.json");
  const { data: committeeData, loading: committeeLoading } = useFetchData("committee.json");
  const { data: sponsorsData, loading: sponsorsLoading } = useFetchData("sponsors.json");
  const { data: siteData, loading: siteLoading } = useFetchData("siteData.json");

  const navigate = useNavigate();

  const [discordStats, setDiscordStats] = useState(null);
  const maxStorage = 500; // Suggested github repo limit in MB

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackLoading, setFeedbackLoading] = useState(true);
  const [feedbackError, setFeedbackError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setFeedbackLoading(true);
        setFeedbackError(null);

        const res = await fetch("/.netlify/functions/fetch-feedback");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid data format from fetch-feedback function");
        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setFeedbackError(err.message);
      } finally {
        setFeedbackLoading(false);
      }
    };

    if (process.env.REACT_APP_DEV_MODE === "true") {
      setFeedbacks([
      { Message: "Test feedback 1", Read: "" },
      { Message: "Test feedback 2", Read: "Yes" },
      { Message: "Test feedback 2", Read: "Yes" }
    ]);
    setFeedbackLoading(false);
    setFeedbackError(null);
    } else {
      fetchFeedback();
    }
  }, []);

  const { stats, loading, error } = useRepoStats();

  useEffect(() => {
    const fetchDiscordStats = async () => {
      if (process.env.REACT_APP_DEV_MODE === "true") {
        setDiscordStats({ total: 1234, online: 56 });
      } else {
        // real fetch for production
        try {
          const res = await fetch("/.netlify/functions/discord-stats");
          const data = await res.json();
          setDiscordStats(data);
        } catch (err) {
          setDiscordStats(null);
        }
      }
    };

    fetchDiscordStats();
  }, []);

  const exportData = () => {
    const exportObj = {
      events: eventsData || {},
      committee: committeeData || [],
      sponsors: sponsorsData || [],
      siteData: siteData || {},
    };

    const jsonStr = JSON.stringify(exportObj, null, 2);

    const blob = new Blob([jsonStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.download = `hacksussex_export_${timestamp}.json`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };


  if (eventsLoading || committeeLoading || sponsorsLoading || siteLoading) return (
      <LoadingScreen message={"loading dashboard"}/>
  );

  const storageMB = stats?.repo?.diskUsageKB ? (stats.repo.diskUsageKB / 1024).toFixed(1) : 0;
  const storagePercent = Math.min(100, Math.round((storageMB / maxStorage) * 100));
  const totalFeedback = feedbacks.length;
  const readFeedback = feedbacks.filter(f => f.Read === "Yes").length;
  const readPercentage = totalFeedback > 0 ? Math.round((readFeedback / totalFeedback) * 100) : 100;

  return (
    <div className={styles.container}>
      <div className={styles.dashBoardHeader}>
        <div>
          <h1 className={styles.title}>HackSussex Dashboard</h1>
          <p className={styles.description}>Welcome to the Hack Sussex Dashboard</p>
        </div>  
        <div className={styles.buttonContainer}>
          <button className="secondaryBtn" onClick={exportData}>Export Data</button>
          <button className="secondaryBtn" onClick={() => window.location.reload()}>Refresh</button>
          <button
            className="primaryBtn"
            onClick={() => {
              const repo = process.env.REACT_APP_GITHUB_REPO;
              if (!repo) return alert("Repo not set");

              const commitsUrl = `https://github.com/${repo}/commits/main`;
              window.open(commitsUrl, "_blank");
            }}
          >
            Open GitHub Commits ({stats?.repo?.commitsByUser})
          </button>
        </div>
      </div>
      
      <div className="content">
        <div className={styles.storageGalleryContainer}>
          <div className={styles.storageDiscordSection}>
            <div className={styles.discordFeedbackContainer}>
            <div className={styles.discordCard} onClick={() => {
              if (siteData?.discord) {
                window.open(siteData.discord, "_blank", "noopener,noreferrer");
              } else {
                console.warn("Discord URL not set in siteData");
              }
            }}>
              {discordStats ? (
                <>
                  <h2><Users size={18} style={{ marginRight: "0.5rem" }}/> Discord Stats</h2>
                  <p className={styles.discordStat}>Total Members: {discordStats.total}</p>
                  <p className={styles.discordStat}>Online: <span className={styles.greenDot}></span> {discordStats.online}</p>
                </>
              ) : (
                <LoadingScreen message="loading discord stats" padding={5} textMargin={"10px"}/>
              )}
            </div>
              
            <div className={styles.feedbackContainer}>
              {feedbackLoading ? (
                <LoadingScreen message="Loading feedback" />
              ) : feedbackError ? (
                <p className="error-msg">Error</p>
              ) : (
                <div className={styles.circularProgress}>
                  <svg viewBox="0 0 36 36" className={styles.progressCircle}>
                    <path
                      className={styles.bg}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={styles.fg}
                      strokeDasharray={`${readPercentage}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="15.35" className={styles.percentage} textAnchor="middle">
                      {readPercentage}%
                    </text>
                    <text x="18"
                        y="20.5"
                        className={styles.label}
                        textAnchor="middle"
                        dominantBaseline="middle">
                      Feedback
                    </text>
                    <text x="18"
                        y="25"
                        className={styles.label}
                        textAnchor="middle"
                        dominantBaseline="middle">
                      Read
                    </text>
                  </svg>
                </div>
              )}
            </div>

              
            </div>

              <div className={styles.storageSection}>
              <div className={styles.storageHeader}>
                <h2>Storage Usage</h2>
                <p>{storageMB}MB / {maxStorage}MB</p>
              </div>
              <div className={styles.storageBar}>
                <div
                  className={styles.storageFill}
                  style={{ width: `${storagePercent}%` }}
                />
              </div>
            </div>
          </div>

          <GalleryPreview />
        </div>


        <div className={styles.cards}>
          <div className={styles.card} onClick={() => {navigate("/dashboard/events")}}>
            <p>{eventsData?.upcomingEvents?.length || 0}</p>
            <h2>Upcoming Events</h2>
            <Calendar />
          </div>
          <div className={styles.card} onClick={() => {navigate("/dashboard/events")}}>
            <p>{eventsData?.pastEvents?.length || 0}</p>
            <h2>Past Events</h2>
            <Calendar />
          </div>
          <div className={styles.card} onClick={() => {navigate("/dashboard/committee")}}>
            <p>{committeeData?.filter(m => !m.pastCommittee).length || 0}</p>
            <h2> Committee Members</h2>
            <Users />
          </div>
          <div className={styles.card} onClick={() => {navigate("/dashboard/sponsors")}}>
            <p>{sponsorsData?.length || 0}</p>
            <h2> Sponsors</h2>
            <Handshake />
          </div>
        </div>

        <div className={styles.eventSocialContainer}>

        <section className={styles.upcoming}>
          {eventsData?.upcomingEvents?.length ? (
            (() => {
              const sortedEvents = [...eventsData.upcomingEvents].sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              );
              const nextEvent = sortedEvents[0];

              return (
                <div className={styles.eventItem} onClick={() => {navigate("/dashboard/events/"+nextEvent.id)}}>
                  <div className={styles.eventInfo}>
                    <h2>Upcoming event: {nextEvent.title}</h2>
                    <div className={styles.eventInformation}>
                      <div className={styles.eventLeft}>
                        <p>Event Type: {nextEvent.eventType}</p>
                        <p style={{fontStyle: "italic"}}>{nextEvent.location}</p>
                        <p className={styles.eventDescription}>{nextEvent.description}</p>
                        <a>{nextEvent.ticketsLink}</a>
                      </div>
                      <div className={styles.eventRight}>
                        <p>
                          {new Date(nextEvent.date).toLocaleDateString("en-GB", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <img className={styles.eventLogo} src={nextEvent.logo}></img>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className={styles.eventItem}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                }}
              >
                No upcoming events.
              </div>
            </div>
          )}
        </section>


        <section className={styles.socials}>
          {siteData != null && Object.entries(siteData).map(([key, url]) => {
            if (!url) return null; 

            const Icon = SOCIAL_ICONS[key]; 

            return (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialItem}
              >
                <Icon size={18} />
                <span>HackSussex's {key.charAt(0).toUpperCase() + key.slice(1)}</span>
              </a>
            );
          })}
        </section>

          </div>

        <AnalyticsChart />

      </div>
    </div>
  );
};

export default Dashboard;
