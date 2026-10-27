import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mailchimp form POST URL (taken from your embed code)
    const url =
      "https://hacksussex.us15.list-manage.com/subscribe/post?u=9e45a284e1a81af850dfe3a60&id=52659894c0&f_id=007aade0f0";

    const formData = new FormData();
    formData.append("EMAIL", email);

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors", // Mailchimp requires this, we won’t get a response
        body: formData,
      });
      // After submitting, redirect home
      navigate("/");
    } catch (err) {
      console.error("Mailchimp error:", err);
    }
  };

  return (
    <div className="signup-fullpage">
      <div className="signup-card">
        <h1 className="signup-title">Join HackSussex</h1>
        <p className="signup-subtitle">
          Subscribe to stay updated on events, workshops, and hackathons.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="signup-label">
            Email Address <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
