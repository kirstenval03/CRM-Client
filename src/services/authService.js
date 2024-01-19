import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

const getToken = () => {
  const token = localStorage.getItem("authToken");
  console.log("Token from localStorage:", token); // Add this line for debugging
  return token;
};

const createHeaders = (userRole) => {
  const token = getToken();
  const headers = {};

  if (token) {
    // Include the Authorization header with the token
    headers.Authorization = `Bearer ${token}`;
  }

  if (userRole) {
    headers["X-User-Role"] = userRole;
  }

  return headers;
};

export const get = (route, userRole) => {
  const headers = createHeaders(userRole);

  return axios.get(SERVER_URL + route, {
    headers: headers,
  });
};

export const post = (route, body, userRole) => {
  const headers = createHeaders(userRole);

  return axios.post(SERVER_URL + route, body, {
    headers: headers,
  });
};
