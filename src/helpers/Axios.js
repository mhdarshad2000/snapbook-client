import axios from "axios";
import Cookies from "js-cookie";

export const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      Cookies.set("user", "");
      window.location.href = "/login";
    } else {
      return Promise.reject(error);
    }
  }
);
