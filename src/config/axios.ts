import { STORAGE_KEY } from "@constants/login/auth";
import axios from "axios";
import { parseCookies } from "nookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const cookies = parseCookies();

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    Authorization: `Bearer ${cookies[STORAGE_KEY]}`,
  },
});
