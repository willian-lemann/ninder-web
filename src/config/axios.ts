import axios from "axios";

const APP_URL =
  process.env.VERCEL === "1"
    ? process.env.VERCEL_URL
    : process.env.NEXT_PUBLIC_APP_URL;

export const api = axios.create({
  baseURL: `${APP_URL}/api`,
});
