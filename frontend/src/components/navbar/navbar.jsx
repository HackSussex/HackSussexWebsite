import React, { useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import messages from "./navbar.messages";
import HSLogo from "../../assets/hackSussex/HS logo small gradient.svg";
import { useSiteData } from "../../hooks/useSiteData";

const Navbar = () => {
  const navigate = useNavigate();
  const { siteData, events, loading } = useSiteData();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) return null;

  const upcomingEvent = useMemo(() => {
    if (!events?.upcomingEvents?.length) return null;
    const now = Date.now();
    // filter out past events
    const futureEvents = events.upcomingEvents.filter(
      (e) => new Date(e.date) > now,
    );
    if (!futureEvents.length) return null;

    // attach closed flag based on 7-day cutoff
    const annotated = futureEvents.map((e) => {
      const eventDate = new Date(e.date).getTime();
      const cutoff = eventDate - 7 * 24 * 60 * 60 * 1000;
      return { ...e, ticketsClosed: now > cutoff };
    });

    // prefer first event with tickets still open
    const openEvents = annotated.filter((e) => !e.ticketsClosed);
    const pool = openEvents.length ? openEvents : annotated;
    return pool.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [events]);

  const links = messages.links.map((link) => {
    if (link.name === "Merch Store")
      return { ...link, path: siteData?.merch || "#", external: true };
    return link;
  });

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navBar}>
        {siteData?.mlhToggle && (
          <div className={styles.mlhBanner}>
            <a
              href="https://mlh.io/seasons/2026/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="MLH 2026 Hackathon Season"
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
                style={{ width: "100px" }}
              />
            </a>
          </div>
        )}

        <div className={styles.leftContainer}>
          <div
            className={styles.logoContainer}
            onClick={() => {
              navigate("/");
              setMobileOpen(false);
            }}
          >
            <img src={HSLogo} alt="Hack Sussex Logo" className={styles.logo} />
          </div>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.navLinks}>
            {links.map((link) => (
              <div key={link.name} className={styles.navItem}>
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    {link.name}
                  </a>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.navLink} ${styles.active}`
                        : styles.navLink
                    }
                  >
                    {link.name}
                  </NavLink>
                )}
                {link.dropdown && (
                  <div className={styles.dropdownMenu}>
                    {link.dropdown.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        className={styles.dropdownItem}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {upcomingEvent && !upcomingEvent.ticketsClosed ? (
              <button
                className={styles.ticketBtn}
                onClick={() =>
                  window.open(
                    upcomingEvent.ticketsLink,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                Get Tickets
              </button>
            ) : (
              <button
                className={styles.ticketBtn}
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            )}
          </div>
        </div>

        <div className={styles.mobileControls}>
          {upcomingEvent && !upcomingEvent.ticketsClosed && (
            <button
              className={styles.ticketBtn}
              onClick={() =>
                window.open(
                  upcomingEvent.ticketsLink,
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              Get Tickets
            </button>
          )}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.open : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ""}`}>
        {links.map((link) => (
          <div key={link.name} className={styles.mobileItem}>
            {link.dropdown ? (
              link.dropdown.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={styles.mobileSubItem}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))
            ) : link.external ? (
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ) : (
              <NavLink to={link.path} onClick={() => setMobileOpen(false)}>
                {link.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
