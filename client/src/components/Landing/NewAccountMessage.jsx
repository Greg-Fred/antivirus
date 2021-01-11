import { useContext } from "react";

import greg from '../../assets/images/legreg.jpg'


const NewAccountMessage = ({data}) => {


  return(
    <div className="  bg-gray-200 flex items-center justify-center  ">
      <div className="w-full mx-auto rounded-lg bg-white shadow-lg px-5 pt-5 pb-10 text-gray-800">
        <div className="w-full pt-1 pb-5">
          <div className="overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg">
            <img  src={greg} alt=""/>
            </div>
          </div>
          <div className="w-full mb-10">
            <div className="text-3xl text-indigo-500 text-left leading-tight h-3">“</div>
            <p className="text-sm text-gray-600 text-center px-5"> Bien joué ! <strong>{data}</strong> Votre compte a été créé avec succès. Un email de confirmation vous a été envoyé à l'adresse !</p>
            <div className="text-3xl text-indigo-500 text-right leading-tight h-3 -mt-3">”</div>
          </div>
          <div className="w-full">
            <p className="text-md text-indigo-500 font-bold text-center">Le Greg</p>
            <p className="text-xs text-gray-500 text-center"></p>
          </div>
        </div>
      </div>
  )
};

export default NewAccountMessage;
