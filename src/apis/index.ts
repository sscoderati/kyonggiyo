"use client";

import axios from "axios";
import { toast } from "sonner";
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
    if (error.response.data.code === "G003") {
      toast.error("세션이 만료되었습니다. 다시 로그인 해주세요.");
      useTokenStore.getState().reset();
    }
    return Promise.reject(error);
  },
);
