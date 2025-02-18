'use client'
import React, { useState } from 'react';
import { FaPlus, FaTrash, FaBell } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import AsideDashboard from '../../../../Components/Aside_Dashbar/page';
import { addNewBill } from '../../../../lib/bill-reminder';


interface Bill {
  id: string;
  billName: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
}

const BillReminderPage = () => {
  const { user } = useUser();
  const [bills, setBills] = useState<Bill[]>([]);
  const [billName, setBillName] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [billDueDate, setBillDueDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const[userEmail,setuserEmail]=useState('');

 
  const addBill = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
      setError('Please log in to add a bill');
      return;
    }

    // Validation
    if (!billName.trim() || !billAmount || !billDueDate) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      
      const response = await addNewBill(
        billName,
        new Date(billDueDate),
        parseFloat(billAmount),
        userEmail,
        user.id
      );

      
      const newBill: Bill = {
        id: response.id || Date.now().toString(),
        billName: billName,
        amount: parseFloat(billAmount),
        dueDate: billDueDate,
        isPaid: false,
      };

      
      setBills([...bills, newBill]);

      
      setBillName('');
      setBillAmount('');
      setBillDueDate('');
      setuserEmail('')
    } catch (error) {
      console.error('Error creating bill:', error);
      setError('Failed to add bill. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const togglePaidStatus = (id: string) => {
    setBills(
      bills.map((bill) =>
        bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill
      )
    );
  };

  
  const deleteBill = (id: string) => {
   

try{

}
catch(err){

}



  };

  
  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="flex bg-gray-900 text-white">
      <AsideDashboard />

      <div className="min-h-screen bg-gray-900 text-white p-8 max-w-full w-10/12 rounded-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-4">
            <FaBell /> Bill Reminder
          </h1>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Bill Input Form */}
          <form
            onSubmit={addBill}
            className="bg-gray-800 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="billName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Bill Name
                </label>
                <input
                  id="billName"
                  type="text"
                  placeholder="Bill Name"
                  value={billName}
                  onChange={(e) => setBillName(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="billAmount"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Amount
                </label>
                <input
                  id="billAmount"
                  type="number"
                  placeholder="Bill Amount"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  step="0.01"
                  min="0"
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="billDueDate"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Due Date
                </label>
                <input
                  id="billDueDate"
                  type="date"
                  value={billDueDate}
                  onChange={(e) => setBillDueDate(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="userEmail"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="userEmail"
                  type="text"
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <FaPlus /> {isSubmitting ? 'Adding Bill...' : 'Add Bill'}
            </button>
          </form>

          {/* Bill List */}
          {bills.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No bills added yet. Start adding your bills!
            </div>
          ) : (
            <div className="space-y-4">
              {bills.map((bill) => {
                const daysUntilDue = getDaysUntilDue(bill.dueDate);
                const dueDateObj = new Date(bill.dueDate);

                return (
                  <div
                    key={bill.id}
                    className={`bg-gray-800 p-4 rounded-lg flex items-center justify-between ${
                      bill.isPaid ? 'opacity-50' : ''
                    } ${
                      daysUntilDue <= 0
                        ? 'border-2 border-red-600'
                        : daysUntilDue <= 7
                        ? 'border-2 border-yellow-600'
                        : ''
                    }`}
                  >
                    <div className="flex-grow">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">{bill.billName}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${
                            bill.isPaid
                              ? 'bg-green-600'
                              : daysUntilDue <= 0
                              ? 'bg-red-600'
                              : daysUntilDue <= 7
                              ? 'bg-yellow-600'
                              : 'bg-blue-600'
                          }`}
                        >
                          {bill.isPaid
                            ? 'Paid'
                            : daysUntilDue <= 0
                            ? 'Overdue'
                            : `${daysUntilDue} days left`}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-300">
                        <p>Amount: {bill.amount} Tk</p>
                        <p>Due Date: {dueDateObj.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => togglePaidStatus(bill.id)}
                        className={`p-2 rounded-full ${
                          bill.isPaid
                            ? 'bg-gray-600 text-white'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        {bill.isPaid ? 'Unpaid' : 'Mark Paid'}
                      </button>
                      <button
                        onClick={() => deleteBill(bill.id)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillReminderPage;