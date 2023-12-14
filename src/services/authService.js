import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

const getToken = () => {
  return localStorage.getItem("authToken");
};

const createHeaders = (isE3 = false, isSalesCoach = false) => {
  const token = getToken();
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (isE3) {
    headers["X-User-Role"] = "E3";
  } else if (isSalesCoach) {
    headers["X-User-Role"] = "SalesCoach";
  }

  return headers;
};

export const get = (route, isE3 = false, isSalesCoach = false) => {
  const headers = createHeaders(isE3, isSalesCoach);

  return axios.get(SERVER_URL + route, {
    headers: headers,
  });
};

export const post = (route, body, isE3 = false, isSalesCoach = false) => {
  const headers = createHeaders(isE3, isSalesCoach);

  return axios.post(SERVER_URL + route, body, {
    headers: headers,
  });
};
