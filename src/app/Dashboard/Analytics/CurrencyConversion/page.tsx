'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { FaArrowUp } from "react-icons/fa";
import { Card } from 'flowbite-react';
import { useAuth } from '@clerk/nextjs';
import { currency_convert, currency_list } from '../../../../../lib/currency';
import AsideDashboard from '../../../../../Components/Aside_Dashbar/page';

const CurrencyConversion = () => {
  const { isSignedIn } = useAuth();
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BDT');
  const [result, setResult] = useState<string | null>(null);
  const [list, setList] = useState<string[]>(['USD', 'BDT']);
  const [error, setError] = useState('');

  // Move currencies fetch to useMemo/useEffect
  useEffect(() => {
    if (!isSignedIn) return;

    async function fetchCurrencies() {
      try {
        const currencies = await currency_list();
        setList(currencies.map((currency: { code: string }) => currency.code));
      } catch (err) {
        setError('Failed to fetch currencies');
      }
    }

    fetchCurrencies();
  }, [isSignedIn]);

  // Conversion effect
  useEffect(() => {
    if (!isSignedIn || !amount || !fromCurrency || !toCurrency) return;

    async function fetchCurrencyConvert() {
      try {
        const conversionResult = await currency_convert(fromCurrency, toCurrency, Number(amount));
        setResult(conversionResult);
        setError('');
      } catch (err) {
        setError('Conversion failed');
        setResult(null);
      }
    }
    
    fetchCurrencyConvert();
  }, [amount, fromCurrency, toCurrency, isSignedIn]);

  // Early return for authentication
  if (!isSignedIn) {
    return null;
  }

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className='flex bg-black'> 
         <AsideDashboard/>
    <div className="min-h-screen bg-gray-800 w-10/12 rounded-sm">
   
      <div className="shadow bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-semibold text-white">Currency Conversion</h1>
          <p className="mt-1 text-sm text-gray-200">
            Convert between different currencies using real-time exchange rates
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 bg-gray-400 rounded-xl shadow-sm">
            <form className="space-y-6">
              <div>
                <label htmlFor="amount" className="block text-gray-700 mb-1 font-bold text-xl">
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 bg-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter amount"
                  min="0"
                  step="any"
                />
              </div>

              <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                <div>
                  <label htmlFor="fromCurrency" className="block text-gray-700 mb-1 font-bold text-xl">
                    From
                  </label>
                  <select
                    id="fromCurrency"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {list.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleSwapCurrencies}
                  className="mt-6 p-3 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Swap currencies"
                >
                  <FaArrowUp className="w-6 h-6 text-gray-600" />
                </button>

                <div>
                  <label htmlFor="toCurrency" className="block font-bold text-xl text-gray-700 mb-1">
                    To
                  </label>
                  <select
                    id="toCurrency"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {list.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency} 
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                <p className="text-gray-700">
                  <span className="font-semibold">{amount}</span> {fromCurrency} =
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {result} {toCurrency}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Last updated: {new Date().toString()}
                </p>
              </div>
            )}
          </Card>
        </div>
      </main>
      </div>
      </div>
    

  );
}

export default CurrencyConversion;