"use client";

import React, { useEffect, useState } from "react";
import { everyTransactions } from "../../../../lib/transactions";
import AdminAsideDashboard from "../../../../Components/Admin_Aside_Dashbar/page";

interface AdminTranTabletranProps {
  transactionId: number;
  description: string;
  ammount: number;
  type: string;
  transactionDate: string;
  transactionCategory: string;
  userId: string;
}

const AdminTabletran = () => {
  const [response, setResponse] = useState<AdminTranTabletranProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const result = await everyTransactions();
        setResponse(result);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  const handleDelete = (transactionId: number) => {
    setResponse((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.transactionId !== transactionId)
    );
  };

  return (
    <div className="flex bg-gray-600">
      <AdminAsideDashboard />
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Transactions</h2>

        {loading && <p className="text-center text-gray-500">Loading transactions...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && response.length === 0 && (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}

        {!loading && response.length > 0 && (
          <div className="overflow-x-auto rounded-lg border border-gray-300 w-full">
            <table className="w-full text-sm text-gray-700 bg-white border-collapse ">
              
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-right">Amount (BDT)</th>
                  <th className="px-6 py-3 text-center">Type</th>
                  <th className="px-6 py-3 text-center">Date</th>
                  <th className="px-6 py-3 text-center">Category</th>
                  <th className="px-6 py-3 text-center">User ID</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
         
              <tbody>
                {response.map((transaction, index) => (
                  <tr
                    key={transaction.transactionId}
                    className={`border-t border-gray-300 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition duration-200`}
                  >
                    <td className="px-6 py-3">{transaction.transactionId}</td>
                    <td className="px-6 py-3">{transaction.description}</td>
                    <td className="px-6 py-3 text-right font-semibold">{transaction.ammount}</td>
                    <td
                      className={`px-6 py-3 text-center font-semibold ${
                        transaction.type === "credit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-center">{transaction.transactionCategory}</td>
                    <td className="px-6 py-3 text-center text-gray-500">{transaction.userId}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(transaction.transactionId)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTabletran;
