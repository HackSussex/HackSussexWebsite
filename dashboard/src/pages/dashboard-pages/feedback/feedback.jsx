import { useEffect, useState } from "react";
import styles from "./feedback.module.css";
import LoadingScreen from "../../../components/loading";

const TEST_MODE = process.env.REACT_APP_DEV_MODE;

const FAKE_DATA = [];

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingRow, setUpdatingRow] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        setLoading(true);
        setError(null);

        if (TEST_MODE) {
          console.warn("TEST MODE ENABLED — using fake data");
          setFeedbacks(FAKE_DATA);
          return;
        }

        const res = await fetch("/.netlify/functions/fetch-feedback");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        if (!Array.isArray(data))
          throw new Error("Invalid data format from fetch-feedback function");

        setFeedbacks(data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const toggleRead = async (originalIndex, unread = false) => {
    try {
      setUpdatingRow(originalIndex);

      if (TEST_MODE) {
        setFeedbacks((prev) =>
          prev.map((f, i) =>
            i === originalIndex ? { ...f, Read: unread ? "" : "Yes" } : f
          )
        );
        return;
      }

      const res = await fetch("/.netlify/functions/mark-read", {
        method: "POST",
        body: JSON.stringify({
          row: originalIndex + 2,
          unread,
        }),
      });

      if (!res.ok)
        throw new Error(`Failed to mark as ${unread ? "unread" : "read"}`);

      setFeedbacks((prev) =>
        prev.map((f, i) =>
          i === originalIndex ? { ...f, Read: unread ? "" : "Yes" } : f
        )
      );
    } catch (err) {
      console.error("Error updating read state:", err);
      alert("Failed to update feedback read state");
    } finally {
      setUpdatingRow(null);
    }
  };

  if (loading) return <LoadingScreen message="Fetching feedback..." />;
  if (error) return <p className={"error-msg"}>Error: {error}</p>;

  const withIndex = feedbacks.map((f, index) => ({ ...f, originalIndex: index }));

  const unreadFeedbacks = withIndex.filter((f) => !f.Read || f.Read === "" || f.Read === "No");
  const readFeedbacks = withIndex.filter((f) => f.Read === "Yes");

  const renderCardInfo = (f) =>
    Object.entries(f)
      .filter(([key]) => key !== "Read" && key !== "originalIndex")
      .map(([key, value]) => (
        <p key={key} className={styles.row}>
          <strong>{key}:</strong> {value}
        </p>
      ));

  return (
    <div className={styles.container}>
      <div className={"header"}>
        <div className={styles.headerText}>
          <h1>Feedback</h1>
          <p>Respond to and mark feedback as read or unread</p>
          </div>
         <div className={styles.headerButtons}>
          <button
            className="secondaryBtn"
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/1RI4F6yIPf0Mi4QCTBHpNKzr0JMP8AzTbQXmulB3ZOyg/edit",
                "_blank"
              );
            }}
          >
            See Form
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Unread Feedback ({unreadFeedbacks.length})</h2>
        {unreadFeedbacks.length === 0 ? (
          <p className={"empty-msg"}>No unread feedback.</p>
        ) : (
          <ul className={styles.list}>
            {unreadFeedbacks.map((f) => (
              <li key={f.originalIndex} className={styles.card}>
                <div className={styles.info}>{renderCardInfo(f)}</div>
                <button
                  className={"secondaryBtn"}
                  onClick={() => toggleRead(f.originalIndex)}
                  disabled={updatingRow === f.originalIndex}
                >
                  {updatingRow === f.originalIndex ? "Updating..." : "Mark as Read"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Read Feedback ({readFeedbacks.length})</h2>
        {readFeedbacks.length === 0 ? (
          <p className={"empty-msg"}>No read feedback.</p>
        ) : (
          <ul className={`${styles.list} ${styles.readFeedback}`}>
            {readFeedbacks.map((f) => (
              <li key={f.originalIndex} className={styles.card}>
                <div className={styles.info}>{renderCardInfo(f)}</div>
                <button
                  className={"secondaryBtn"}
                  onClick={() => toggleRead(f.originalIndex, true)}
                  disabled={updatingRow === f.originalIndex}
                >
                  {updatingRow === f.originalIndex ? "Updating..." : "Mark as Unread"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feedback;
