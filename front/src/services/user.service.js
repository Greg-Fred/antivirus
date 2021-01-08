import axios from "axios";
import authHeader from "./auth-header";

// const API_URL = "http://localhost:3000/auth/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getUserBoard = () => {
  return axios.get("/auth/dashboard", { headers: authHeader() });
};

// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };

// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

export default {
  getUserBoard
};
