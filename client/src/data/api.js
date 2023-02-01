import axios from "axios";

export const API = axios.create({
  //   baseURL: process.env.REACT_APP_BASEURL,
  baseURL: "http://127.0.0.1:5000/api/istidata",
});

export function setAuthToken(token) {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
}
