// utils/axiosInstance.ts

import axios from 'axios';
import { getAccessToken, refreshAccessToken } from './auth';

// Create a reusable axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor: attach access token if available
axiosInstance.interceptors.request.use(config => {
  const accessToken = getAccessToken();
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor: handle 401 errors and refresh token automatically
axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    // If access token expired, attempt refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Attach new token and retry original request
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      }
    }

    // Reject if refresh fails or other error occurs
    return Promise.reject(err);
  }
);

export default axiosInstance;
