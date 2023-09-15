import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url, token) => {
  const makeRequest = axios.create({
    baseURL: "https://api-pokedex-d61l.onrender.com/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
