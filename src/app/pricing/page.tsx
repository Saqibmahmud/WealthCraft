
import React from "react";
    import NavbarComponent from "../../../Components/Navbar/page";
    import FooterComponent from "../../../Components/Footer/page";
    
    import { Metadata } from "next";
import Link from "next/link";
    
    export const metadata: Metadata = {
        title: "Pricing",
        description: "Choose the best plan for your personal finance management needs",
      };

    
    const Pricing = () => {
      return (
        <>
          <NavbarComponent />
    
          <div className="bg-gray-50 py-16 px-8">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-purple-600 mb-4">
                Pricing Plans
              </h1>
              <p className="text-lg text-gray-600">
                Flexible plans to suit your financial management needs. Whether you're just getting started or you're a seasoned pro, we have the perfect plan for you.
              </p>
            </section>
    
           
            <section className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Basic</h3>
                <p className="text-4xl font-bold text-gray-800 mb-4">Free</p>
                <p className="text-gray-600 mb-6">Ideal for individuals just starting with personal finance management.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Expense tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Basic reports
                  </li>
                </ul>
                <Link href='/#'>
                <button  className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-700 transition duration-300">
                  Get Started
                </button></Link>
              </div>
    
              {/* Premium Plan */}
              <div className="p-6 bg-white shadow-lg rounded-lg text-center border-2 border-purple-600">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Premium</h3>
                <p className="text-4xl font-bold text-gray-800 mb-4"><b>৳</b>250/month</p>
                <p className="text-gray-600 mb-6">Perfect for individuals looking for advanced financial tools and insights.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Expense tracking
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Goal setting
                  </li>
                </ul>
                <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-700 transition duration-300">
                  Upgrade Now
                </button>
              </div>
    
             
              <div className="p-6 bg-white shadow-md rounded-lg text-center">
                <h3 className="text-xl font-bold text-purple-600 mb-4">Enterprise </h3>
                <p className="text-4xl font-bold text-gray-800 mb-4">N/A</p>
                <p className="text-gray-600 mb-6">Designed for businesses or professionals with advanced financial needs.</p>
                <ul className="space-y-2 text-left">
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    All Premium features
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Team collaboration tools
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Priority support
                  </li>
                </ul>
                <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md font-bold hover:bg-purple-700 transition duration-300">
                  Contact Us
                </button>
              </div>
            </section>
    
            {/* Call-to-Action Section */}
            <section className="max-w-7xl mx-auto mt-16 text-center py-16 bg-purple-600 text-white rounded-md shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Find the Right Plan for You</h2>
              <p className="text-lg">
                Start today and take control of your personal finances with Wealthcraft.
              </p>
              <Link href='/services'>
              <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
                Explore Features
              </button></Link>
            </section>
          </div>
    
          <FooterComponent />
        </>
      );
    };
    
    export default Pricing;
    
  
