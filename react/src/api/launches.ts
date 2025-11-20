import { Launch } from "types";
import axios, { isAuth } from "utils/axios";

export const getLaunches = async (): Promise<Launch[]> => {
  if (!isAuth()) {
    return [];
  }
  const { data } = await axios.get("/launches");
  return data;
};
