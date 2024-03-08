"use client";

import axios from "axios";
import { useTokenStore } from "@/store/UserStore";

axios.defaults.withCredentials = true;

const axiosConfig = {
  baseURL: "https://dev.kyonggiyo.site/",
  timeout: 5000,
};

export const baseInstance = axios.create({
  ...axiosConfig,
});

baseInstance.interceptors.request.use((config) => {
  const token = useTokenStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }
  return config;
});

baseInstance.interceptors.response.use(
  (response) => {
    if (response.headers.authorization) {
      const existingToken = useTokenStore.getState().token;
      existingToken &&
        useTokenStore.setState({
          token: {
            ...existingToken,
            accessToken: response.headers.authorization,
          },
        });
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
