
import React from 'react'
import Image from 'next/image'
import logo from '../../public/WealthCraft.png'

const UsermenuNav = () => {
  return (
    <>
    
    <nav className=" bg-gradient-to-r from-purple-600 via-purple-800 to-black text-white border-gray-200 dark:bg-gray-900 h-28 ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className=" relative left-24 flex items-center space-x-3 rtl:space-x-reverse">
        <Image src={logo} className="h-15 w-40" alt="Wealthcraft logo" />
    </a>
    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4  focus:ring-black dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
        </button>
     
        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 dark:text-white">AL Mahmud</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">saqibalmahmud@gmaiul.com</span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
          
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </li>
          </ul>
        </div>
       
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1    " id="navbar-user">
      <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0
       md:bg-purple-500 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        
        <li>
          <a href="/about" className="block  text-2xl font-bold py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0
           dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
        </li>
        <li>
          <a href="/services" className="block text-2xl  font-bold py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
        </li>
        <li>
          <a href="/pricing" className="block text-2xl   font-bold py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
        </li>
        <li>
          <a href="/contact" className="block text-2xl font-bold py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
        </li>
      </ul>
    </div>
    </div>
  </nav>
  <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
</>  
  )
}

export default UsermenuNav
























