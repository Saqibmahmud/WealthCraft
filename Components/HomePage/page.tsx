'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import mobile_pic from '../../public/mobile_pic.png'
import Link from 'next/link'
import Feedback from '../Feedback/page'
import { useAuth } from '@clerk/nextjs'
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Homepage = () => {
  const { isSignedIn } = useAuth();

  const [startIndex, setStartIndex] = useState(0);
  const visibleFeatures = 3;


  const handleNext = () => {
    if (startIndex + visibleFeatures < features.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
    else{
      setStartIndex(features.length - visibleFeatures);
    }
  };
  const features = [
    {
      title: "Expense Tracking",
      description: "Automatically categorize and track all your expenses in real-time",
      icon: "📊"
    },
    {
      title: "Investment Portfolio",
      description: "Monitor and analyze your investments across multiple platforms",
      icon: "📈"
    },
    {
      title: "Bill Reminders",
      description: "Never miss a payment with smart bill tracking and reminders",
      icon: "🔔"
    },
    {
      title: "Financial Reports",
      description: "Generate detailed reports and insights about your spending habits",
      icon: "📑"
    },
    {
      title: "Currency Conversion",
      description: "Automatically convert to your local currency",
      icon: "💱",
    },
    {
      title: "Ask Ai",
      description: "Ask Ai any question related to finance",
      icon: "🤖"
    }
  ];
  const totalFeatures = features.length; 
  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic expense tracking",
        "Monthly reports",
        "2 bank connections",
        "Email support"
      ]
    },
    {
      name: "Premium",
      price: "৳250",
      features: [
        "Advanced expense tracking",
        "Real-time insights",
        "Unlimited bank connections",
        "Priority support",
        "Investment tracking",
        "Custom categories"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "N/A",
      features: [
        "All Premium features",
        "Multiple users",
        "API access",
        "Custom reporting",
        "Dedicated support",
        "Data export"
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Hero Section */}
      <header className="max-w-7xl mx-auto py-20 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between relative ">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-6xl md:text-5xl font-bold text-gray-900 leading-snug">
            Do <span className="text-purple-600">more</span> with your money
          </h1>
          <p className="text-gray-600 mt-6">
            WealthCreaft delivers all the data, insight, and functionality you need
            to keep your finances moving forward.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link href={isSignedIn ? '/Dashboard' : 'https://square-liger-98.accounts.dev/sign-in?sign_in_force_redirect_url=http%3A%2F%2Flocalhost%3A3000%2FDashboard&redirect_url=http%3A%2F%2Flocalhost%3A3000%2F'}>
              <button className="bg-purple-600 text-white py-3 px-6 rounded-lg text-sm shadow hover:bg-purple-700 transition">
                Dashboard
              </button>
            </Link>
            <Link href='/pricing'>
              <button className="border border-purple-600 text-purple-600 py-3 px-6 rounded-lg text-sm shadow hover:bg-purple-50 transition">
                See price plans
              </button>
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <span className="font-bold text-gray-900"><b>৳</b>{" "}250/month</span>{" "}
            <span className="line-through">৳500</span>{" "}
            <span className="text-red-500">50% off</span>
          </p>
        </div>
        
        <Feedback/>
      
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center md:justify-end md:mr-2">
          <div className="md:mr-4 w-[280px] h-[550px]">
            <Image
              src={mobile_pic}
              alt="Phone Banking UI"
              objectFit="contain"
            />
          </div>
        </div>
      </header>
   

    

<section className="bg-white py-20 mt-10">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
      Popular Features
    </h2>
    <div className=" w-full">
      <div className="flex items-center  ">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-200 rounded-full shadow-md disabled:opacity-50 cursor-pointer "
          
        >
          <FaChevronLeft size={24} />
        </button>
        
        <div className=" overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out "
            style={{
              transform: `translateX(-${(startIndex * 100) / visibleFeatures}%)`,
              width: `${(totalFeatures / visibleFeatures) * 100}%`
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="w-1/4 p-6 bg-gray-50 rounded-xl flex-shrink-0 "
              >
                <div className="text-4xl mb-4 ">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleNext}
          className="p-2 bg-gray-200 rounded-full shadow-md disabled:opacity-50 cursor-pointer"
         
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  </div>
</section>
      {/* Pricing Section */}
      <section className="py-20 mt-10 mb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid  md:grid-cols-3 gap-8 mt-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl ${
                  plan.popular ? 'bg-purple-600 text-white shadow-xl '
                    : 'bg-white text-gray-900 shadow'
                }`}
              >
                <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
                <div className="text-3xl font-bold mb-6">
                  {plan.price}
                  <span className="text-sm font-normal">/month</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <FaCheckCircle className="w-5 h-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-8 py-3 px-6 rounded-lg text-sm shadow transition ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;