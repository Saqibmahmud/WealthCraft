"use client";

import { useState } from "react";
import AsideDashboard from "../../../../Components/Aside_Dashbar/page";

const TaxCalculator = () => {
  const [income, setIncome] = useState<number | "">("");
  const [tax, setTax] = useState<number | null>(null);
  const [netIncome, setNetIncome] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string>("");

  const calculateTax = () => {
    if (income === "" || income < 0) return;

    let remainingIncome = Number(income);
    let taxAmount = 0;
    let taxDetails = "";

 
    if (remainingIncome > 1600000) {
      let taxed = (remainingIncome - 1600000) * 0.25;
      taxAmount += taxed;
      taxDetails += `Above 1,600,000 BDT: 25% of ${remainingIncome - 1600000} = ${taxed.toFixed(2)} BDT\n`;
      remainingIncome = 1600000;
    }
    if (remainingIncome > 1100000) {
      let taxed = (remainingIncome - 1100000) * 0.20;
      taxAmount += taxed;
      taxDetails += `1,100,001 - 1,600,000 BDT: 20% of ${remainingIncome - 1100000} = ${taxed.toFixed(2)} BDT\n`;
      remainingIncome = 1100000;
    }
    if (remainingIncome > 700000) {
      let taxed = (remainingIncome - 700000) * 0.15;
      taxAmount += taxed;
      taxDetails += `700,001 - 1,100,000 BDT: 15% of ${remainingIncome - 700000} = ${taxed.toFixed(2)} BDT\n`;
      remainingIncome = 700000;
    }
    if (remainingIncome > 400000) {
      let taxed = (remainingIncome - 400000) * 0.10;
      taxAmount += taxed;
      taxDetails += `400,001 - 700,000 BDT: 10% of ${remainingIncome - 400000} = ${taxed.toFixed(2)} BDT\n`;
      remainingIncome = 400000;
    }
    if (remainingIncome > 300000) {
      let taxed = (remainingIncome - 300000) * 0.05;
      taxAmount += taxed;
      taxDetails += `300,001 - 400,000 BDT: 5% of ${remainingIncome - 300000} = ${taxed.toFixed(2)} BDT\n`;
      remainingIncome = 300000;
    }

    setTax(taxAmount);
    setNetIncome(Number(income) - taxAmount);
    setBreakdown(taxDetails);
  };

  return (
    <div className="flex bg-gray-700">
        <AsideDashboard/>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Bangladesh Tax Calculator</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Income (BDT)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value ? Number(e.target.value) : "")}
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter your income"
        />
      </div>

      <button
        onClick={calculateTax}
        className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
      >
        Calculate Tax
      </button>

      {tax !== null && netIncome !== null && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <p className="text-lg font-semibold">Results:</p>
          <p>Tax Amount: <span className="font-bold">{tax} BDT</span></p>
          <p>Net Income: <span className="font-bold">{netIncome} BDT</span></p>

          <div className="mt-4 bg-white p-4 rounded-lg border">
            <h3 className="text-md font-bold">Tax Calculation Breakdown:</h3>
            <pre className="text-sm text-gray-700 whitespace-pre-line">{breakdown}</pre>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-200 rounded">
        <h3 className="text-lg font-semibold">Tax Calculation Explanation</h3>
        <p className="text-sm text-gray-700">
          The tax is calculated based on **Bangladesh's tax slabs**. 
          <br />• **Income up to 300,000 BDT** is **tax-free**.
          <br />• The next **100,000 BDT** is taxed at **5%**.
          <br />• The next **300,000 BDT** is taxed at **10%**.
          <br />• The next **400,000 BDT** is taxed at **15%**.
          <br />• The next **500,000 BDT** is taxed at **20%**.
          <br />• Any amount **above 1,600,000 BDT** is taxed at **25%**.
          <br /><br />
          This calculation helps ensure fair taxation based on different income levels.
          <br /><br />
          If you're a business owner, you may also need a **BIN (Business Identification Number)** 
          for tax-related activities in **Bangladesh**.
        </p>
      </div>
    </div>
    </div>
    
  );
};

export default TaxCalculator;
