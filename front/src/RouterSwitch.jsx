import React, { useState } from 'react';
// Module de routage
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Importation du contexte


//Importation des composants


//Importation du layout
import BaseLayout from './BaseLayout.jsx'
import Home from './pages/Home';
import Modal from './components/Modal';

import testContext from './contexts/testContext';
import Dashboard from './pages/Dashboard';

// Hooks personnalisé qui toggle la modale
const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  function toggle() {
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    toggle
  };
};

const RouterSwitch = () => {



  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const { isShowing: isRegistrationFormShowed, toggle: toggleRegistrationForm } = useModal();
  const { isShowing: newAccountMessage, toggle: toggleNewAccount } = useModal();

  const [newAccountName, setNewAccountName] = useState();

  const welcomeAccount = (name) => {
    setNewAccountName(name);
  }

  const [name, setName] = useState('francis');

  return (
    <testContext.Provider value={{ name: name, newName: setName }}>

      <Router>

          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
            <BaseLayout toggleRegistration={toggleRegistrationForm} isRegistrationFormShowing={isRegistrationFormShowed} toggleLogin={toggleLoginForm} isLoginShowing={isLoginFormShowed}>
              <Home newMessage={newAccountMessage} registrationStatement={isRegistrationFormShowed} loginStatement={isLoginFormShowed} />
              {isLoginFormShowed || isRegistrationFormShowed || newAccountMessage ?
                <Modal setNewAccountName={welcomeAccount} newAcountName={newAccountName} toggleAccountMessage={toggleNewAccount} isAccountMessageOn={newAccountMessage} hideRegistration={toggleRegistrationForm} isRegistrationShowing={isRegistrationFormShowed} hideLogin={toggleLoginForm} isLoginShowing={isLoginFormShowed} />
                : null
              }
            </BaseLayout>
            </Route>

          </Switch>

      </Router>

    </testContext.Provider>
  )

};

export default RouterSwitch
