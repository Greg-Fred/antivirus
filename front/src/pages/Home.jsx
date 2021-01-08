
import { useContext, useState } from "react";
import Modal from '../components/Modal';
import testContext from '../contexts/testContext';


const Home = ({ newMessage, registrationStatement, loginStatement}) => {

  const {name, newName} = useContext(testContext);


  return(
    <>
    <h1>{name}</h1>
    <h1>{JSON.stringify(newMessage)}</h1>
      <h1>{JSON.stringify(loginStatement)}</h1>
      <h1>{JSON.stringify(registrationStatement)}</h1>
</>
    )
}

export default Home
