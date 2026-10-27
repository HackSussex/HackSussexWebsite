import React, { useState, useEffect } from "react";

const LiveDateTime = () => {
  const [dateTime, setDateTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  const formatted = dateTime.toISOString().slice(0, 19).replace("T", " ");

  return <p className="date-time">{formatted}</p>;
};

export default LiveDateTime;
