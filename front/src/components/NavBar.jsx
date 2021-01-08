import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {

  const { toggleRegistration, toggleLogin } = props;


  return (
    <nav>
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center ">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" />

              </div>

            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <p className="text-gray-300">Salut nouvel utilisateur !</p>
                <div className="ml-3 relative">


                  <div>
                    <Link to="/dashboard">Dashboard</Link>

                  </div>

                  <div>
                    <button onClick={toggleLogin} className="max-w-xs text-gray-300 bg-gray-800  flex items-center text-sm ">
                      Log in
                    </button>
                  </div>






                </div>
                <div className="ml-3 relative">
                  <div>
                    <button onClick={toggleRegistration} className="max-w-xs text-gray-300 bg-gray-800  flex items-center text-sm ">
                      Sign in
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>

  )
};

export default NavBar
