import React, { useContext, useState } from 'react';
// Module de routage
import { Route, Switch, Link } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';



const RouterAlternative = () => {



  return (


      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>


  )

};

export default RouterAlternative
