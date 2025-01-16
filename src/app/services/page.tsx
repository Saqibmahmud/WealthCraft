import React from "react";
import NavbarComponent from "../../../Components/Navbar/page";
import FooterComponent from "../../../Components/Footer/page";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the services we provide to simplify personal finance management.",
};

const Services = () => {
  return (
    <>
      <NavbarComponent />

      <div className="bg-gray-50 py-16 px-8">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            We offer these and many more comprehensive suite of tools to help you manage your finances effortlessly.
          </p>
        </section>

        {/* Services Section */}
        <section className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Multi-Currency Support */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Multi-Currency Support</h2>
            <p className="text-gray-600">
              Manage transactions in multiple currencies effortlessly:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>Exchange different currencies.</li>
              <li>Convert currencies easily.</li>
              <li>View live currency exchange rates.</li>
            </ul>
          </div>

          {/* Debt Tracker */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Debt Tracker</h2>
            <p className="text-gray-600">
              Stay on top of your loans and repayments with ease:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>Track loans and repayment schedules.</li>
              <li>Manage, update, or delete debts.</li>
              <li>Get notified when repayment is due.</li>
            </ul>
          </div>

          {/* Expense Sharing */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Expense Sharing</h2>
            <p className="text-gray-600">
              Share expenses and split bills with friends:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>Split and save bills efficiently.</li>
              <li>Check your share of the bill (issue resolved).</li>
              <li>Pay bills with ease (upcoming feature).</li>
            </ul>
          </div>

          {/* Custom Alerts */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Custom Alerts</h2>
            <p className="text-gray-600">
              Get notified when you exceed your spending limits:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>Set monthly spending limits for categories.</li>
              <li>Receive alerts when limits are exceeded.</li>
              <li>Customize category spending limits anytime.</li>
            </ul>
          </div>

          {/* Budget Tracking */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Budget Tracking</h2>
            <p className="text-gray-600">
              Track income, expenses, and net income efficiently:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>Record expenses in categorized transactions.</li>
              <li>Track income and expenses monthly or yearly.</li>
              <li>View detailed summaries of your finances.</li>
            </ul>
          </div>

          {/* Spending Categories */}
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">Spending Categories</h2>
            <p className="text-gray-600">
              Analyze your spending patterns by category:
            </p>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-gray-600">
              <li>View detailed analysis of spending categories.</li>
              <li>Calculate total spending in each category.</li>
              <li>Identify areas for potential savings.</li>
            </ul>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="max-w-7xl mx-auto mt-16 text-center py-16 bg-purple-600 text-white rounded-md shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Experience the Difference</h2>
          <p className="text-lg">
            Our tools are designed to make managing your finances simple and effective. Start using them today!
          </p>
          <Link href='/#'>
          <button className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition duration-300">
            Get Started
          </button></Link>
        </section>
      </div>

      <FooterComponent />
    </>
  );
};

export default Services;
