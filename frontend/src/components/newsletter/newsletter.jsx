import React, { useState } from "react";
import styles from "./newsletter.module.css";
import messages from "./newsletter.messages";
import { FiArrowRight } from "react-icons/fi";

// Replace with your Mailchimp form action URL
const MAILCHIMP_URL = process.env.REACT_APP_MAILCHIMP_URL;

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    console.log("Subscribe button clicked");

    if (!email) {
      console.log("No email entered");
      alert(messages.invalidEmail);
      return;
    }

    console.log("Starting subscription for:", email);
    setLoading(true);

    try {
      await new Promise((resolve) => {
        const callbackName = `jsonp_callback_${Date.now()}`;
        const jsonpUrl =
          MAILCHIMP_URL.replace("/post?", "/post-json?") +
          `&EMAIL=${encodeURIComponent(email)}&c=${callbackName}`;
        console.log("JSONP URL:", jsonpUrl);

        window[callbackName] = (response) => {
          console.log("Mailchimp response:", response);

          if (response.result === "success") {
            console.log("Subscription successful!");
            alert(messages.success);
          } else {
            console.log("Subscription error:", response.msg);
            alert(`${messages.error} ${response.msg || ""}`);
          }

          resolve();

          delete window[callbackName];
          document.body.removeChild(script);
          console.log("JSONP script removed from DOM");
        };

        const script = document.createElement("script");
        script.src = jsonpUrl;
        script.async = true;
        document.body.appendChild(script);
        console.log("JSONP script appended to DOM");
      });

      console.log("Subscription promise resolved");
      setEmail(""); // clear input
    } catch (err) {
      console.error("Subscription failed with error:", err);
      alert(messages.error);
    } finally {
      console.log("Stopping spinner");
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.emailInputWrapper} ${loading ? styles.disabled : ""}`}
    >
      <input
        type="email"
        placeholder={messages.placeholder}
        aria-label="Email address"
        disabled={loading}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        aria-label="Subscribe"
        onClick={handleSubscribe}
        disabled={loading}
        className={styles.arrowButton}
        style={{ opacity: 1 }}
      >
        {loading ? <div className={styles.spinner}></div> : <FiArrowRight />}
      </button>
    </div>
  );
};

export default NewsletterSignup;
