import React from "react";
import styles from "./footer.module.css";
import messages from "./footer.messages";
import logo from "../../assets/hackSussex/gradient.png";
import Socials from "../socials/socials";
import { useLocation, useNavigate } from "react-router-dom";
import NewsletterSignup from "../newsletter/newsletter";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className={styles.container}>
      {/* ───────────── TOP ROW ───────────── */}
      <div className={styles.topRow}>
        <div className={styles.newsletter}>
          <h3>Stay in the loop</h3>
          <NewsletterSignup /> {/* use new component */}
        </div>

        <div className={styles.socials}>
          <h3>Join our community</h3>
          <Socials />
        </div>
      </div>

      {/* ───────────── MIDDLE ROW ───────────── */}
      <div className={styles.middleRow}>
        <div className={styles.brandColumn}>
          <img
            src={logo}
            alt={messages.logoAlt}
            className={styles.logo}
            onClick={() => navigate("/")}
          />
          <p className={styles.brandText}>{messages.footerDescription}</p>
        </div>

        <div className={styles.linksColumn}>
          {messages.linkColumns.map((column, i) => (
            <div key={i} className={styles.linksGroup}>
              <h4>{column.title}</h4>
              <div className={styles.linksContainer}>
                {column.links.map((link, j) => {
                  const isActive =
                    location.pathname + location.hash === link.href;
                  const isExternal = /^https?:\/\//.test(link.href);
                  return (
                    <a
                      key={j}
                      href={link.href}
                      className={isActive ? styles.activeLink : ""}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────── BOTTOM ROW ───────────── */}
      <div className={styles.bottomRow}>
        <span>
          © {new Date().getFullYear()} {messages.copyrightHolder}
        </span>

        <div className={styles.bottomLinks}>
          <a href={messages.privacyPolicy.href}>
            {messages.privacyPolicy.label}
          </a>
          <a
            href={messages.dashboard.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {messages.dashboard.label}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
