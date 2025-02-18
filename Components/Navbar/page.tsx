'use client'
import { Navbar } from "flowbite-react";
import React from 'react'
import Image from 'next/image'
import image from '../../public/personal finance management.png'

import {
  
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'



const NavbarComponent = () => {
 
  return (
    <Navbar fluid rounded className="sticky top-0 bg-purple-500 z-50">
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
      <Navbar.Link className="cursor-pointer  font-semibold rounded-3xl  text-lg  hover:px-12 hover:py-4 hover:bg-slate-400 text-black transition-transform">   <SignedOut>
       <SignInButton  />                   {/* .env file e force redirection er libnk disi ekhane na diye */}
    </SignedOut>
    
    <SignedIn  >
  <UserButton 
 
  />
</SignedIn>
      
   

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



 
  
    

