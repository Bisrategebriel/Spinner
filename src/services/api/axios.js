import axios from "axios";

export const Loginaxios = axios.create({
  baseURL: "https://api.games.dytech-services.com/v1/retailer/login",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const token = localStorage.getItem("token");

export const Spinnaxios = axios.create({
  baseURL: "https://api.games.dytech-services.com/v1/game/current",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  },
});

const spinResultaxios = (id) => {
  return axios.create({
    baseURL: `https://api.games.dytech-services.com/v1/game/result/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default spinResultaxios;
