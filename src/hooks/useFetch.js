import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(url);

      if (!response) {
        console.error("Error in fetching all blogs.");
        return;
      }
      setData(response?.data?.data);
    } catch (error) {
      console.error("Error in fetching", error);
      setError(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetchData: fetchData };
};

export default useFetch;
