import VirusComponent from './VirusComponent';

const DashboardBody = (props) => {

  const { virus, user, logout } = props;

 return (
   <div className="h-custom-calc overflow-hidden w-screen flex bg-gray-200">

     {/* LEFT COLUMN */}
     <div className="hidden lg:flex flex-col items-center bg-white text-gray-700 shadow
		h-full">
       <ul>
         <li className="hover:bg-gray-100">
           <button className="h-16 px-6 flex justify-center items-center w-full
					focus:text-orange-500">
             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
               <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
							2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
							0-1.79 1.11z"></path>
             </svg>
           </button>
         </li>
         <li className="hover:bg-gray-100">
           <button className="h-16 px-6 flex justify-center items-center w-full
					focus:text-orange-500">
             <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
             </svg>
           </button>
         </li>
         <li className="hover:bg-gray-100">
           <button className="h-16 px-6 flex justify-center items-center w-full
					focus:text-orange-500">
             <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <circle cx="12" cy="12" r="3"></circle>
               <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"></path>
             </svg>
           </button>
         </li>
       </ul>
       <div className="mt-auto h-16 flex items-center w-full">
         <button onClick={logout} className="h-16 mx-auto flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
           <svg class="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
             <polyline points="16 17 21 12 16 7"></polyline>
             <line x1="21" y1="12" x2="9" y2="12"></line>
           </svg>
         </button>
       </div>
     </div>

     {/* RIGHT COLUMN */}

     <div className=" overflow-y-auto w-full">

       {/* barre d'info de compte et test react */}

       <div class="py-5 ">
         <main class="h-full ">
           <div class="container  mx-auto grid">



             <div class="grid  gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">

               <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                 <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                   </svg>
                 </div>
                 <div>
                   <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                     User email
                    </p>
                   <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                     {user.email}
                   </p>
                 </div>
               </div>

               <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                 <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                   </svg>
                 </div>
                 <div>
                   <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                     User ID
                    </p>
                   <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                     {user.id}
                   </p>
                 </div>
               </div>

               <div class="flex  items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                 <div class="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                     <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd"></path>
                   </svg>
                 </div>
                 <div>
                   <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                     Nombre de virus uploadé :
                    </p>
                   <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
                     {user.virus.length}
                   </p>
                 </div>
               </div>

               <div class=" flex items-center  p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">

                 <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                   <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                   </svg>
                 </div>
                 <div className=" overflow-y-auto ">
                   <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                     User Access Token
                    </p>
                   <p class="text-xs   font-semibold text-gray-700 dark:text-gray-200">
                     {user.accessToken}
                   </p>
                 </div>
               </div>
             </div>

           </div>
         </main>
       </div>

      <div className="container flex justify-center  my-10 mx-auto">


         <button
           type="button"
           class="border border-indigo-500 bg-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
         >
           Add a file
      </button>


      </div>


       {/* Composant des virus */}
       <div className=" ">
       <div className=" container   mx-auto">
         <div className="flex-1  flex flex-col">
           <div class="flex flex-col">
             <div class="-my-2  sm:-mx-6 lg:-mx-8">
               <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                 <div class="shadow  border-b border-gray-200 sm:rounded-lg">

                   {/* Les menus */}
                   <table class="min-w-full  divide-y divide-gray-200">

                     <thead class="bg-gray-50">
                       <tr>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           FileName
                        </th>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Info
                        </th>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           Status
                        </th>
                         <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                           ???
                        </th>
                       </tr>
                     </thead>

                     <tbody class="bg-white divide-y divide-gray-200">


                       {/* Une entrée */}

                       {virus.map((virus, index) => {
                         return <VirusComponent virus={virus} key={index} />
                       })}




                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
           </div>

         </div>

       </div>
       </div>


     </div>



   </div>
 )
};

export default DashboardBody;
