
import React from "react";
import NavbarComponent from "../../../Components/Navbar/page";
import FooterComponent from "../../../Components/Footer/page";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Reach out to us for any inquiries or support.",
};

const Contact = () => {
  return (
    <>
    <NavbarComponent />

    <div className="bg-gray-50 py-16 px-8">
    
      <section className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          Have questions, feedback, or need assistance? We're here to help.
        </p>
      </section>

     
      <section className='contact-form'>
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Get in Touch</h2>
        <form action="/send-message" method="post" className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              name="name"
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-200 focus:outline-none'
              placeholder="Enter your name"
              required
            />
          </div>

        
          <div>
            <label className="block text-gray-700 font-medium mb-2">Your Email</label>
            <input
              type="email"
              name="email"
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-200 focus:outline-none'
              placeholder="Enter your email"
              required
            />
          </div>

      
          <div>
            <label className="block text-gray-700 font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              className='w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-200 focus:outline-none'
              placeholder="Enter the subject"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              name="message"
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-200 focus:outline-none"
              rows={5}
              placeholder="Write your feedback or message here..."
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-md font-bold hover:bg-purple-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Contact Information */}
      <section className="max-w-7xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-purple-600 mb-6">Other Ways to Reach Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-phone"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600">+880 1712 644 758</p>
          </div>

          {/* Email */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-envelope"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">support@wealthcraft.com</p>
          </div>

          {/* Address */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div className="text-purple-600 text-4xl mb-4">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3 className="text-xl font-bold mb-2">Address</h3>
            <p className="text-gray-600">
             Mohammadpur,Dhaka-1207
            </p>
          </div>
        </div>
      </section>
    </div>

    <FooterComponent />
  </>
  )
}

export default Contact