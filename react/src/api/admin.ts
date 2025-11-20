import axios from "utils/axios";

export const login = async (email: string, password: string) => {
  const response = await axios.post("/admin/token", { email, password });
  return response.data;
};

export const signup = async (email: string, password: string) => {
  const response = await axios.post("/admin/signup", { email, password });
  return response.data;
};