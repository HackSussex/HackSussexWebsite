import React, { useEffect, useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import styles from "./dashboard.module.css";
import { TailSpin } from 'react-loader-spinner';

const AnalyticsChart = () => {
  const [rawData, setRawData] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDriveData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/.netlify/functions/fetch-drive");
        const json = await res.json();
        setRawData(json);
      } catch (err) {
        console.error("Error fetching Drive data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDriveData();
  }, []);

  const chartData = useMemo(() => {
    if (!rawData) return [];

    const years = Array.from(new Set([
      ...Object.keys(rawData.Hackathons || {}),
      ...Object.keys(rawData.GameJams || {})
    ])).sort();

    return years
      .map(year => {
        const hackathonData = rawData.Hackathons?.[year];
        const gamejamData = rawData.GameJams?.[year];

        if (!hackathonData && !gamejamData) return null;

        return {
          year,
          hackathons: hackathonData?.checkedIn ?? null,
          gamejams: gamejamData?.checkedIn ?? null,
          genderHackathons: hackathonData?.gender ?? { Male: 0, Female: 0, Other: 0 },
          genderGameJams: gamejamData?.gender ?? { Male: 0, Female: 0, Other: 0 },
        };
      })
      .filter(Boolean);
  }, [rawData]);


  return (
    <div className={styles.analyticsChart}>
      <div className={styles.analyticsTop}>
        <h2>Event Attendance Overview</h2>
        <div className="button-container">
          <button
            className="primaryBtn"
            onClick={() =>
              window.open(
                "https://drive.google.com/file/d/1NQpUuBZJx2XT0UghPuMSHupAKEU699Bh/view?pli=1",
                "_blank"
              )
            }
          >
            Add Data
          </button>
        </div>
      </div>

    {loading ? <div style={{ height: "400px", width: "100%" }} className="loading-container">
        <TailSpin height="80" width="80" color="var(--text-colour)" ariaLabel="loading" />
     </div> : 

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Legend />
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;

              const hack = payload.find(p => p.dataKey === "hackathons")?.payload;
              const jam = payload.find(p => p.dataKey === "gamejams")?.payload;

              const totalHack = Object.values(hack?.genderHackathons || { Male:0, Female:0, Other:0 }).reduce((a,b)=>a+b,0) || 1;
              const totalJam = Object.values(jam?.genderGameJams || { Male:0, Female:0, Other:0 }).reduce((a,b)=>a+b,0) || 1;

              return (
                <div style={{ background: "#222", padding: 10, borderRadius: 8, color: "#fff" }}>
                  <strong>{label}</strong>
                  <hr style={{ opacity: 0.2 }} />

                  {hack && (
                    <div style={{ marginBottom: 5 }}>
                      <strong>Hackathons</strong>
                      <div>Checked In: {hack?.hackathons ?? 0}</div>
                      <div>Male: {Math.round((hack?.genderHackathons?.Male || 0) / totalHack * 100)}%</div>
                      <div>Female: {Math.round((hack?.genderHackathons?.Female || 0) / totalHack * 100)}%</div>
                      <div>Other: {Math.round((hack?.genderHackathons?.Other || 0) / totalHack * 100)}%</div>
                    </div>
                  )}

                  {jam && (
                    <div>
                      <strong>Game Jams</strong>
                      <div>Checked In: {jam?.gamejams ?? 0}</div>
                      <div>Male: {Math.round((jam?.genderGameJams?.Male || 0) / totalJam * 100)}%</div>
                      <div>Female: {Math.round((jam?.genderGameJams?.Female || 0) / totalJam * 100)}%</div>
                      <div>Other: {Math.round((jam?.genderGameJams?.Other || 0) / totalJam * 100)}%</div>
                    </div>
                  )}
                </div>
              );
            }}
          />
          <Line type="linear" dataKey="hackathons" name="Hackathons" stroke="#5A8DEE" strokeWidth={3} dot connectNulls={false}/>
          <Line type="linear" dataKey="gamejams" name="Game Jams" stroke="#7ba0e4ff" strokeWidth={3} dot connectNulls={false}/>
        </LineChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default AnalyticsChart;
