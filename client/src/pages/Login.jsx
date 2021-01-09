import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";

import AuthService from "../services/auth.service";




// LE COMPOSANT LOGIN
const Login = () => {

  const user = AuthService.getCurrentUser();


  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Les messages d'erreur lié à chacun des champs
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  });

  // Modification des inputs et suppression du message d'erreur en direct
  const handleOnchange = (e) => {
    setCredentials(v => ({ ...credentials, [e.target.name]: e.target.value }));
    setErrorMessage(v => ({ ...errorMessage, [e.target.name]: '' }));
  };

  // Call api vers le serveur pour se connecter
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {



        const response = await AuthService.login(credentials.email, credentials.password);
        history.push("/dashboard");

        // Ici on doit traiter en cas de réussite du login !

      } catch (error) {
        if (error.response.data.message === "Bad password") {
          setErrorMessage(v => ({ ...errorMessage, ["password"]: error.response.data.message }));
          console.log(errorMessage);
        } else if (error.response.data.message === "This user don't exist") {
          setErrorMessage(v => ({ ...errorMessage, ["email"]: error.response.data.message }));
          console.log(errorMessage);
        } else {
          console.log(error.response.data.message);
        }
      }
    }
  };

  ///// VALIDATION - La validation fonctionne mais est déjà géré par le form, tailwind je suppose. A voir donc
  const validate = () => {

    let isValid = true;

    if (credentials["email"] === "") {
      isValid = false;
      setErrorMessage(v => ({ ...errorMessage, ["email"]: "Please enter your email Address." }));
    }

    if (typeof credentials["email"] !== "") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(credentials["email"])) {
        isValid = false;
        setErrorMessage(v => ({ ...errorMessage, ["email"]: "Please enter valid email address." }));
      }
    }

    if (credentials["password"] === "") {
      isValid = false;
      setErrorMessage(v => ({ ...errorMessage, ["password"]: "Please enter your password" }));
    }

    return isValid;
  }


  if (!user) {

  return (

    <div className=" flex items-center h-screen justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full  space-y-8">
        <div>
          <img className="mx-44 h-32 w-auto" src="https://www.flaticon.com/svg/static/icons/svg/2484/2484786.svg"
            alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Viens te connecter :
            </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" required onChange={handleOnchange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ton Email" />
              <div className="text-red-600">{errorMessage.email}</div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" require type="password" onChange={handleOnchange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Ton mot de passe" />
              <div className="text-red-600">{errorMessage.password}</div>
            </div>
          </div>


          <div class="flex items-center justify-between">
            <div class="flex items-center">

              <input id="remember_me" name="remember_me" type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                Remember me
            </label>

            </div>

            <div class="text-sm">
              <a href="/forgotpwd" class="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
            </a>
            </div>
          </div>


          <div class="flex items-center justify-between">
            <div class="flex items-center">

              <a href="#" class=" mx-auto ml-2 block font-bold text-blue-900">
                Pas de compte ?
            </a>
            </div>

          </div>

          <input type="submit" id="submit" value="Log in!"
            className=" login group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

          />



        </form>
      </div>
    </div>
    )
  } else {
    return (<Redirect to="/dashboard" />)
  }

}

export default Login
