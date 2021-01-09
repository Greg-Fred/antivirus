import axios from "axios";
import {useHistory} from 'react-router-dom';


// const API_URL = "http://localhost:3000/auth/";

const register = (username, email, password) => {
  return axios.post("/auth/signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post("/auth/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");

};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
