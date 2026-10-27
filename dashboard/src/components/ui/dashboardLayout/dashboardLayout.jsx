import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  CalendarDays,
  Users,
  Handshake,
  Settings,
  Layers,
  Image,
  ReplyIcon
} from "lucide-react";
import styles from "./dashboardLayout.module.css";

const DashboardLayout = () => {
  const [scrollY, setScrollY] = useState(0);
  const [sidebarMoves, setSidebarMoves] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const checkAndAttach = () => {
      const isSmall = window.innerWidth <= 1300;

      setSidebarMoves(!isSmall);

      if (isSmall) {
        setScrollY(0);
        window.removeEventListener("scroll", handleScroll);
      } else {
        window.addEventListener("scroll", handleScroll);
      }
    };

    checkAndAttach();

    window.addEventListener("resize", checkAndAttach);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkAndAttach);
    };
  }, []);

  const mainNav = [
    { to: "/dashboard", label: "Home", icon: <Home size={20} /> },
    { to: "/dashboard/events", label: "Events", icon: <CalendarDays size={20} /> },
    { to: "/dashboard/committee", label: "Committee", icon: <Users size={20} /> },
    { to: "/dashboard/sponsors", label: "Sponsors", icon: <Handshake size={20} /> },
    { to: "/dashboard/sitedata", label: "Site Metadata", icon: <Settings size={20} /> },
    { to: "/dashboard/gallery", label: "Gallery", icon: <Image size={20} /> },
    { to: "/dashboard/feedback", label: "Feedback", icon: <ReplyIcon size={20} /> },
  ];

  const bottomNav = [
    { to: "/dashboard/staging", label: "Staging", icon: <Layers size={20} /> },
  ];

  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <nav
          className={styles.nav}
          style={{
            transform: sidebarMoves
              ? `translateY(${Math.max(0, scrollY - 66)}px)`
              : "translateY(0)",
          }}
        >
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}

          <div className={styles.bottomNav}>
            {bottomNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
        {/* <div className={styles.dashboardRightContainer}>
          <h2>Recent Commits</h2>
        </div> */}
    </div>
  );
};

export default DashboardLayout;
