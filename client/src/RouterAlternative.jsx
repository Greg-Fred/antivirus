import React, { useContext, useState } from 'react';
// Module de routage
import { Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';



const RouterAlternative = () => {



  return (


      <Switch>
        <Route exact path={["/", "/login"]} component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>


  )

};

export default RouterAlternative
