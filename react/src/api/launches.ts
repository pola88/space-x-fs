import { Launch } from "types";
import axios from "utils/axios";

export const getLaunches = async (): Promise<Launch[]> => {
  const { data } = await axios.get("/launches");
  return data;
};
