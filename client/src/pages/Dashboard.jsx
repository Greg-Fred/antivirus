import React, { useEffect, useState } from 'react';
import { useHistory, Redirect, Link } from 'react-router-dom';

import AuthService from "../services/auth.service";
import userService from '../services/user.service';

import VirusComponent from '../components/Dashboard/VirusComponent';
import NavBar from '../components/Dashboard/NavBar';
import DashboardBody from '../components/Dashboard/DashboardBody';

const Dashboard = () => {

  const user = AuthService.getCurrentUser();
  console.log(user);
  const history = useHistory();

  const [virus, setVirus] = useState([]);

  useEffect(() => {

    (async () => {
      try {
        console.log("DASHBOARD SE MONTE");
        const response = await userService.getUserBoard();

        const userVirus = response.data.virus;

        console.log("les virus");
        await setVirus(userVirus);
        console.log(virus);
      } catch (error) {
        console.log(error);
        console.log(error.response.data.message);
        const errorMessage = error.response.data.message;
        if (errorMessage === "invalid token" || errorMessage === "jwt expired") {
          localStorage.removeItem("user");
          history.push('/');
        }
      }
    })();

    return () => {
      console.log("DASHBOARD SE DEMONTE");
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("user");
    history.push('/');

  };

  if (user) {
    return (
      <>
        <NavBar user={user} logout={logout}/>
        <DashboardBody virus={virus} user={user} logout={logout} />
      </>
    )
  } else {
    return (<Redirect to="/login" />)
  }
}

export default Dashboard
