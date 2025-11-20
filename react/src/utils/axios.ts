import axios, { AxiosError } from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});


export const isAuth = () => {
  return axios.defaults.headers.common["Authorization"];
};

export const handleError = (error: AxiosError) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};