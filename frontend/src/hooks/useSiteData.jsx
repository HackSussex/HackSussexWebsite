import { useContext } from "react";
import { SiteDataContext } from "../contexts/siteContext";

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return context;
};
