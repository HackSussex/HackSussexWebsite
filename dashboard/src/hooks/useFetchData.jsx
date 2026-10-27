import { useEffect, useState, useCallback } from "react";
import useToken from "./useToken";

export default function useFetchData(filename) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const token = useToken();
  const repo = process.env.REACT_APP_GITHUB_REPO;

  const fetchData = useCallback(async () => {
    if (!token) {
      setErrorMsg("No token found.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://api.github.com/repos/${repo}/contents/src/config/${filename}`,
        {
          headers: { Authorization: `token ${token}` },
        }
      );

      if (!res.ok) {
        throw new Error(`Error fetching ${filename}: ${res.status}`);
      }

      const jsonRes = await res.json();
      const parsed = JSON.parse(atob(jsonRes.content));
      setData(parsed);
    } catch (err) {
      console.error(err);
      setErrorMsg(`Failed to load ${filename}.`);
    } finally {
      setLoading(false);
    }
  }, [filename, repo, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, errorMsg, refetch: fetchData };
}
