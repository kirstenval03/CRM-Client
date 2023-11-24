import axios from "axios";
import { SERVER_URL } from "./SERVER_URL";

const getToken = () => {
  return localStorage.getItem("authToken");
};

export const get = (route, isE3 = false, isClientOwner = false) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  if (isE3) {
  }
  if (isClientOwner) {
  }

  return axios.get(SERVER_URL + route, {
    headers: headers,
  });
};

export const post = (route, body, isE3 = false, isClientOwner = false) => {
  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };

  if (isE3) {
  }
  if (isClientOwner) {
  }

  return axios.post(SERVER_URL + route, body, {
    headers: headers,
  });
};