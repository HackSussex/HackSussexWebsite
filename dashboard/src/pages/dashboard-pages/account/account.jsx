import React from "react";
import { useRepoStats } from "../../../hooks/useRepoStats";
import LoadingScreen from "../../../components/loading";
import styles from "./account.module.css";
import { SiGithub } from "react-icons/si";
import { FaCalendarAlt, FaBoxOpen, FaFileAlt } from "react-icons/fa";

const Account = () => {
  const { stats, loading, error } = useRepoStats();

  if (loading) return <LoadingScreen message="loading account info" />;
  if (error) return <p className={styles.errorMsg}>Error: {error}</p>;
  if (!stats) return <p className={styles.errorMsg}>No data available</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Account Info</h1>
      <div className={styles.profile}>
        <img
          src={stats.user.avatar}
          alt={stats.user.login}
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h2 className={styles.name}>{stats.user.name}</h2>

          <ul className={styles.statsList}>
            <a
              href={`https://github.com/${stats.user.login}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className={styles.icon} /> {stats.user.login}
            </a>
            <li>
              <FaCalendarAlt className={styles.icon} /> Last Updated:{" "}
              {new Date(stats.repo.updated).toLocaleString()}
            </li>
            <li>
              <FaBoxOpen className={styles.icon} /> Repo Disk Usage:{" "}
              {(stats.repo.diskUsageKB / 1024).toFixed(2)} MB
            </li>
            <li>
              <FaFileAlt className={styles.icon} /> Commits by You:{" "}
              {stats.repo.commitsByUser}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
