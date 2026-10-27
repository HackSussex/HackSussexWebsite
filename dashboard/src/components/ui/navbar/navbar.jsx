import React, { useEffect, useState, useContext } from "react";
import styles from "./navbar.module.css";
import useToken from "../../../hooks/useToken.jsx";
import LiveDateTime from "./dateTime.jsx";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../themeContext.jsx";
import { Moon, Sun } from "lucide-react";
import useSearch from "../../../hooks/useSearch.jsx";
import { useAuth } from "../../../hooks/useAuth.jsx";

const NavbarSearch = () => {
  const { searchResults, setSearchTerm, searchTerm, loading } = useSearch();
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  

  const handleSelect = (item) => {
    if (item.type === "event") navigate(`/dashboard/events/${item.id}`);
    if (item.type === "member") navigate(`/dashboard/committee/${item.id}`);
    if (item.type === "sponsor") navigate(`/dashboard/sponsors/${item.id}`);
    setSearchTerm("");
    setIsFocused(false);
  };

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}  
        onBlur={() => setTimeout(() => setIsFocused(false), 150)} 
        placeholder="Search..."
        className={`${styles.search} ${isFocused && searchTerm && searchResults.length >= 0 ? styles.active : ""}`}
      />
      <Search size={20} className={styles.searchIcon} />

      {isFocused && searchTerm && searchResults.length > 0 && (
        <div className={styles.searchDropdown}>
          {searchResults.map((r) => (
            <p
              key={r.id}
              className={styles.searchItem}
              onClick={() => handleSelect(r)}
            >
              {r.title || r.name} <span className={styles.itemType}>({r.type})</span>
            </p>
          ))}
        </div>
      )}
      {isFocused && searchTerm && searchResults.length === 0 && (
        <div className={styles.searchDropdown}>
          <p className={styles.notFound}>No results found</p>
        </div>
      )}
    </div>
  );
};


const Navbar = () => {
  const { token, user, logout, login, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUri = `${window.location.origin}/callback`;
  const repoFull = process.env.REACT_APP_GITHUB_REPO || ""; 
  const [owner, repo] = repoFull.split("/");
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=repo`;

  const handleLogin = () => {
    localStorage.removeItem("gh_token");
    logout();

    window.location.href = githubAuthUrl;
  };


  return (
    <nav className={styles.navbar}>
      {/* LEFT SIDE */}
      <div className={styles.left}>
        <img
          src="/images/gradient.png"
          alt="HS Logo"
          className={styles.logo}
          onClick={() => {navigate("/")}}
        />

        <div className={styles.repoInfo}>
          <a
            href={`https://github.com/${owner}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {owner}
          </a>
          <span>/</span>
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repo}
          </a>
        </div>
      </div>

      {/* MIDDLE SPACE */}
       {user && !loading && (
      <div className={styles.spacer}>
        <LiveDateTime />
        <NavbarSearch />
      </div>)}

      
      <div className={styles.right}>
      {user && (
        <div className={styles.user} onClick={() => {navigate("/dashboard/account")}}>
          <span>{user.login}</span>
          <img src={user.avatar_url} alt="avatar" className={styles.avatar} />
        </div>)}

        <div className={styles.themeButtons}>
          <button
            className={`themeBtn ${theme === "light" ? "activeTheme" : ""}`}
            onClick={() => toggleTheme("light")}
          >
            <Sun />
          </button>
          <button
            className={`themeBtn ${theme === "dark" ? "activeTheme" : ""}`}
            onClick={() => toggleTheme("dark")}
          >
            <Moon />
          </button>
        </div>

        {loading ? (
          <button className={"primaryBtn"} style={{height: "100%"}}>Logging in...</button>
        ) : user ? (
          <button className={"primaryBtn"} onClick={logout} style={{height: "100%"}}>Logout</button>
        ) : (
        <button className={styles.logInButton} onClick={handleLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={styles.githubLogo}
          >
            <path
              d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.753-1.335-1.753-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.805 1.305 3.49.998.11-.775.42-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.305-.54-1.53.105-3.185 0 0 1.005-.32 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.55 3.285-1.23 3.285-1.23.645 1.655.24 2.88.12 3.185.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.375.825 1.11.825 2.235 0 1.615-.015 2.915-.015 3.31 0 .315.21.69.825.575C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"
              fill="currentColor"
            />
          </svg>
          Log In</button>)}
      </div>
      
    </nav>
  );
};

export default Navbar;
