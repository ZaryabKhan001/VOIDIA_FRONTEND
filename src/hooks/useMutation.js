import React, { useState } from "react";
import { axiosInstance } from "../lib/axios.js";

const useMutation = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async (url = "", method = "POST", data = {}, config = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      setResponse(null);
      const response = await axiosInstance({ url, method, data, ...config });
      setResponse(response.data);
      return response.data;
    } catch (error) {
      setError(error.response.data.errors || error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return { mutate, response, error, isLoading };
};

export default useMutation;
