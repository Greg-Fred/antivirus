
import { useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthService from "../../services/auth.service";

const NavBar = (props) => {

  const history = useHistory();

  const menuArea = useRef();
  const { user, logout } = props;
  const [isDisplay, setIsDisplay] = useState(false);

  const toggleDisplay = () => {
    setIsDisplay(!isDisplay);
  };

  const handleClick = (e) => {
    if ( menuArea.current && menuArea.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside modal click
    setIsDisplay(false);
  };


  useEffect(() => {
    console.log("dashboard se monte");
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      console.log("dashboard se demonte");
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);



  return (

    <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
      <div className="h-16 flex items-center">
        <div className="h-16 flex items-center
					focus:text-orange-500" to='/'>
          <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="" />
        </div>
        <h1 className=" ml-10">{`Compte : ${user.role}`}</h1>
      </div>

      <div className=" flex justify-end flex-grow">
        <h1 className="mr-10 my-auto">{`Bienvenue ${user.username} !`}</h1>

        {/* AVATART */}
        <div className="relative my-auto mr-10" ref={menuArea}>
          <div>
            <button id="login-menu" aria-haspopup="true" onClick={toggleDisplay} className="focus:outline-none" >
              <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
              <span className="absolute bottom-2 right-0 inline-block w-3 h-3 bg-green-600   rounded-full"></span>
            </button>
          </div>

          {isDisplay ? <div  className="origin-top-right  absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="login-menu">


                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                  Sign out
                </button>

            </div>
          </div> : null }


        </div>
      </div>
    </nav>
  )
};

export default NavBar;
