import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export const analyzeCode = async (code: string) => {
  return api.post("/analyze", { code });
};
