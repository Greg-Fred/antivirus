import { useContext } from "react";


import testContext from '../contexts/testContext';

const NewAccountMessage = ({data}) => {

  const {name, newName} = useContext(testContext);

  const handleChange = (e) => {
    console.log(e.target.value);
    newName(e.target.value);
  }

  return(
    <div className="bg-green-100 flex justify-items-auto h-20">
      <h1>Bienvenue monsieur <big>{data}</big> ! Votre compte a été créé !
      Un email de confirmation vous a été envoyé</h1>
      <h2>{name}</h2>

      <form>
        <label htmlFor="name">New Name</label>
        <input onChange={handleChange} type="name" name="name" />

      </form>
      <button onClick={newName} ></button>

    </div>
  )
};

export default NewAccountMessage;
