import { useEffect, useState } from 'react';
import LandingBody from '../components/Landing/LandingBody';
import Modal from '../components/Landing/Modal';

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


const Landing = () => {



  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();
  const { isShowing: isRegistrationFormShowed, toggle: toggleRegistrationForm } = useModal();
  const { isShowing: newAccountMessage, toggle: toggleNewAccount } = useModal();

  const [newAccountName, setNewAccountName] = useState();

  const welcomeAccount = (name) => {
    setNewAccountName(name);
  }

  useEffect( () => {
    console.log(" landing se monte")
    return (
      console.log("landing se demonte")
    )
  })

  return (
    <>

      <LandingBody toggleRegistration={toggleRegistrationForm} toggleLogin={toggleLoginForm} />

      {
        isLoginFormShowed || isRegistrationFormShowed || newAccountMessage ?
          <Modal newAccountName={newAccountName} welcomeAccount={welcomeAccount} toggleAccountMessage={toggleNewAccount} isAccountMessageOn={newAccountMessage} hideRegistration={toggleRegistrationForm} isRegistrationShowing={isRegistrationFormShowed} hideLogin={toggleLoginForm} isLoginShowing={isLoginFormShowed} />
          : null
      }
    </>
  )

}

export default Landing;
