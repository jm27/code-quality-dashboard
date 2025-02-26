import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
});

export const analyzeCode = async (code: string) => {
  return api.post("/analyze", { code });
};
