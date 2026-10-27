import { useEffect, useState } from "react";
import styles from "./contact.module.css";
import messages from "./contact.messages";

const Contact = () => {
  const { page, reasons, thankYou } = messages;
  const reasonKeys = Object.keys(reasons).filter((key) => key !== "default");

  const [reasonKey, setReasonKey] = useState("default");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const updateReasonFromHash = () => {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash && reasons[hash]) {
      setReasonKey(hash);
    } else {
      setReasonKey("default");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    updateReasonFromHash();
    window.addEventListener("hashchange", updateReasonFromHash);
    return () => window.removeEventListener("hashchange", updateReasonFromHash);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "subject") {
      setReasonKey(value);
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      subject: reasons[reasonKey].label,
    };

    try {
      const response = await fetch("https://formspree.io/f/xqeeaydw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true); // mark as submitted
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("⚠️ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", message: "" });
    setReasonKey("default");
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      {submitted ? (
        <div className={styles.thankYouMessage}>
          <h1 className={styles.title}>{thankYou.title}</h1>
          <p>{thankYou.description}</p>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>{page.title}</h1>
          <p>{page.description}</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Name */}
            <label htmlFor="name" className={styles.label}>
              {page.labels.name}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={page.placeholders.name}
              required
              value={form.name}
              onChange={handleChange}
            />

            {/* Email */}
            <label htmlFor="email" className={styles.label}>
              {page.labels.email}
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder={page.placeholders.email}
              required
              value={form.email}
              onChange={handleChange}
            />

            {/* Reason / Subject */}
            <label htmlFor="subject" className={styles.label}>
              {page.labels.reason}
            </label>
            <select
              id="subject"
              name="subject"
              value={reasonKey}
              onChange={handleChange}
            >
              <option value="default">{reasons.default.label}</option>
              {reasonKeys.map((key) => (
                <option key={key} value={key}>
                  {reasons[key].label}
                </option>
              ))}
            </select>

            {/* Message */}
            <label htmlFor="message" className={styles.label}>
              {page.labels.message}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={page.placeholders.message}
              rows="5"
              required
              value={form.message}
              onChange={handleChange}
            />

            <span className={styles.btnContainer}>
              <button className="secondary" type="button" onClick={handleReset}>
                {page.clearButton}
              </button>
              <button type="submit">{page.submitButton}</button>
            </span>
          </form>
        </>
      )}
    </div>
  );
};

export default Contact;
