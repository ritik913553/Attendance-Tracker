import { useState, useEffect } from "react";
import API from "../Utils/Axios.jsx";

const useApi = (endpoint, method = "GET", body = null, executeImmediately = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(executeImmediately);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await API({
        url: endpoint,
        method,
        data: body,
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data : "Network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (executeImmediately) fetchData();
  } , [endpoint, method, body ]);

  return { data, error, loading, refetch: fetchData };
};

export default useApi;
