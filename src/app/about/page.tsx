import React from 'react'
import NavbarComponent from '../../../Components/Navbar/page'
import FooterComponent from '../../../Components/Footer/page'
import Image from 'next/image';
import mission_pic from '../../../public/mission.png'

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "About",
    description: "Personal Finance management System",
  };
const About = () => {
    
      
  return (
    <>
      <NavbarComponent />

      <div className="bg-gray-50 py-16 px-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">
            About Us
          </h1>
          <p className="text-lg text-gray-600">
            Empowering you to take control of your personal finances with
            innovative solutions.
          </p>
        </section>

      
        <section className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
       
          <div className="text-gray-700">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed">
              At <b>Wealthcraft</b>, we aim to make managing your personal
              finances easy and stress-free. Our platform provides tools to
              help you:
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Track your spending effectively.
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Set and achieve financial goals.
              </li>
              <li className="flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Make smarter financial decisions.
              </li>
            </ul>
          </div>

        
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={mission_pic}
              alt="Mission"
              className="object-cover w-full h-full rounded-md shadow-lg"
            />
          </div>
        </section>

        
        <section className="max-w-7xl mx-auto mt-16 text-center">
          <h2 className="text-3xl font-bold text-purple-600 mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-purple-600 text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Insightful Analytics</h3>
              <p className="text-gray-600">
                Gain detailed insights into your finances with easy-to-read
                charts and reports.
              </p>
            </div>
           
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-purple-600 text-4xl mb-4">
                <i className="fas fa-bullseye"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">
                Set financial goals and track your progress effortlessly.
              </p>
            </div>
            
            <div className="p-6 bg-white shadow-md rounded-lg">
              <div className="text-purple-600 text-4xl mb-4">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is safe with us, thanks to our advanced security
                features.
              </p>
            </div>
          </div>
        </section>

      
        <section className="max-w-7xl mx-auto mt-16 text-center py-16 bg-purple-600 text-white rounded-md shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg">
            Join thousands of users who are managing their finances better with
            Wealthcraft.
          </p>
         <Link href="/#"> <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
            Sign Up Now
          </button></Link>
        </section>
      </div>


<FooterComponent/>





    </>
  );
}

export default About