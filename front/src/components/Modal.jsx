import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'
import NewAccountMessage from '../components/NewAccountMessage'

const Modal = ({ setNewAccountName, newAcountName, toggleAccountMessage, isAccountMessageOn, isRegistrationShowing, hideRegistration, isLoginShowing, hideLogin}) => {

const modalArea = useRef();

let toggleDisplay;

let component;

if (isRegistrationShowing) {
  toggleDisplay = hideRegistration;
  component = <RegistrationForm setNewName={setNewAccountName} newAccountMessage={toggleAccountMessage} isLoginShowing={isRegistrationShowing} toggleLogin={hideLogin} toggleRegistration={hideRegistration} isRegistrationShowing={isLoginShowing} />;
} else if ( isLoginShowing) {
  toggleDisplay = hideLogin
  component = <LoginForm isLoginShowing={isRegistrationShowing} toggleLogin={hideLogin} toggleRegistration={hideRegistration} isRegistrationShowing={isLoginShowing} />;
} else if (isAccountMessageOn) {
  component = <NewAccountMessage data={newAcountName} />
  toggleDisplay = toggleAccountMessage;
}





//handle click et le useeffect ont pour but de rajouter la fermeture de la modale quand on click à l'extérieur de la modale. Technique très lourde à refacto ou à revoir entièrement. Pour le moment ça marche. J'ai une petite erreur venant de react mais bon..
const handleClick = (e) => {
  if (modalArea.current.contains(e.target)) {
    // inside click
    return;
  }
  // outside modal click
  toggleDisplay();
};


  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);


  return(
    isLoginShowing || isRegistrationShowing || isAccountMessageOn ? ReactDOM.createPortal(
      <React.Fragment>
        <div className=" h-auto modal-overlay">
          <div className="modal-wrapper">
            <div ref={modalArea} className="modal">
              {component}

            </div>
          </div>
        </div>

        <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1040;
              background-color: rgba(0, 0, 0, 0.5);
            }

            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1050;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              outline: 0;
              display: flex;
              align-items: center;
            }

            .modal {
              z-index: 100;
              background: #fff;
              position: relative;
              margin: auto;
              border-radius: 5px;
              max-width: 500px;
              width: 80%;
              padding: 1rem;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              font-size: 1.4rem;
              font-weight: 700;
              color: #000;
              cursor: pointer;
              border: none;
              background: transparent;
            }
          `}</style>
      </React.Fragment>,
      document.body
    )
      : null
  )
}





export default Modal;

