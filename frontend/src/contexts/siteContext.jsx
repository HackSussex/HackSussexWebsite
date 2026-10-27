import { createContext, useState, useEffect, ReactNode } from "react";

// Import your JSON files
import committeeData from "../config/committee.json";
import eventsData from "../config/events.json";
import sponsorsData from "../config/sponsors.json";
import siteMetadata from "../config/siteData.json";

// to add: faq,

console.log("sponsorsData: ", sponsorsData);

export const SiteDataContext = createContext();

export const SiteDataProvider = ({ children }) => {
  const [data, setData] = useState({
    committee: [],
    events: {},
    sponsors: [],
    siteMetadata: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setData({
        committee: committeeData,
        events: eventsData,
        sponsors: sponsorsData,
        siteData: siteMetadata,
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SiteDataContext.Provider value={{ ...data, loading }}>
      {children}
    </SiteDataContext.Provider>
  );
};
