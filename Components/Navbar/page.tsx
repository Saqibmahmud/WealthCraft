'use client'
import { Navbar } from "flowbite-react";
import React, { useState } from 'react'
import Image from 'next/image'
import image from '../../public/personal finance management.png'
// import Link from "next/link";
// import login from "../../lib/login";
// import Login from "../Login/page";
import {
  
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



const NavbarComponent = () => {
  // const[inputData,setinputdata]=useState({
  //   username:"" ,
  //   password:""

  // })
  
  //const [isDropDown,setDropdown]=useState(false);
  return (
    <Navbar fluid rounded className="sticky top-0 bg-purple-500">
    <Navbar.Brand href="/">
    <Image
  src={image}
  className="object-contain"
  height={70}
  width={250} 
  alt="Wealthcraft Logo"
/>

     
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      
      <Navbar.Link href="/about" className="text-lg"><b>About</b></Navbar.Link>
      <Navbar.Link href="/services" className="text-lg"><b>Services</b></Navbar.Link>
      <Navbar.Link href="/pricing" className="text-lg"><b>Pricing</b></Navbar.Link>
      <Navbar.Link href="/contact" className="text-lg"><b>Contact</b></Navbar.Link>
      <Navbar.Link ><b className="cursor-pointer  border-2 border-black-500 rounded-lg p-3 text-center text-2xl" > <SignedOut>
       <SignInButton  />                   {/* .env file e force redirection er libnk disi ekhane na diye */}
    </SignedOut>
    
    <SignedIn  >
  <UserButton />
</SignedIn>
      
   
</b>
</Navbar.Link>

       
      {/* login er code  */}
      {/* <Navbar.Link ><b className="cursor-pointer text-lg border-2 border-black-500 rounded-lg p-4 text-center" onClick={()=>setDropdown(!isDropDown)}>Login</b></Navbar.Link>
      {isDropDown===true?<div className={`dropdown ${isDropDown?"max-h-40 opacity-100":"max-h-0 opacity-0"}`} style={{transformOrigin:"top",right:'50px',top:'90px'}}>
        <Login/>

      </div>
      :null} */}


      
    </Navbar.Collapse>
  </Navbar>
  )
}

export default NavbarComponent



 
  
    

