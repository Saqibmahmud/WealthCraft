'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import mobile_pic from '../../public/mobile_pic.png'
import Link from 'next/link'
import Feedback from '../Feedback/page'

const Homepage = () => {
  
  return (
  <>
    <div className="bg-gray-50 min-h-screen">
      <header className="max-w-7xl mx-auto py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl md:text-5xl font-bold text-gray-900 leading-snug">
            Do <span className="text-purple-600">more</span> with your money
          </h1>
          <p className="text-gray-600 mt-6">
            Quicken delivers all the data, insight, and functionality you need
            to keep your finances moving forward.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button className="bg-purple-600 text-white py-3 px-6 rounded-lg text-sm shadow hover:bg-purple-700 transition">
              Start Now
            </button>
            <Link href='/pricing'> <button className="border border-purple-600 text-purple-600 py-3 px-6 rounded-lg text-sm shadow hover:bg-purple-50 transition">
              See other plans
            </button></Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <span className="font-bold text-gray-900"><b>৳</b>{" "}250/month</span>{" "}
            <span className="line-through">৳500</span>{" "}
            <span className="text-red-500">50% off</span>
          </p>
        </div>
<Feedback/>
        {/* Right Section */}
        <div className="  mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end md:mr-2 ">
          <div className="md:mr-4 w-[280px] h-[550px]">
            <Image
              src={mobile_pic}
              alt="Phone Banking UI"
            //className="absolute left-0 top-0"
            //   layout="fill"
            objectFit="contain"
            />
          </div>
        
        </div>
      </header>
    </div>
    </>
 
  )
}

export default Homepage