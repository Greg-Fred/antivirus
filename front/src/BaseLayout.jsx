//Import du composant navbar
import NavBar from  './components/NavBar';
import React from 'react';
const BaseLayout = (props) => {

  const { isRegistrationFormShowing, toggleRegistration, toggleLogin, isLoginShowing, children} = props;
return(
  <React.Fragment>
    <NavBar toggleRegistration={toggleRegistration} isRegistrationShowing={isRegistrationFormShowing} toggleLogin={toggleLogin} isShowingLogin={isLoginShowing}/>
    {children && children}
  </React.Fragment>
)

};

export default BaseLayout
