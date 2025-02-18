'use client';
import { Chart as ChartJs, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { getMonthlyCategoriseSpending } from '../../lib/transactions';

ChartJs.register(...registerables);

interface SpendingByCategoryProps {
  savingInvestment: number;
  personalSpendings: number;
  essentialSpendings: number;
  debtPayments: number;
  highest: string;
  lowest: string;
}

const ExpensePieChart = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [category, setCategory] = useState<SpendingByCategoryProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyExpense = async () => {
      try {
        if (user?.id && isSignedIn) {
          const result = await getMonthlyCategoriseSpending(user.id);
          setCategory(result);
        }
      } catch (err) {
        console.error('Error fetching category spending:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyExpense();
  }, [user?.id, isSignedIn]);

  if (loading) return <div className="text-white">Loading...</div>;
  if (!category) return <div className="text-white">No data available</div>;

  const chartData = {
    labels: ['Saving & Investment', 'Personal Expense', 'Essentials', 'Debt'],
    datasets: [{
      data: [
        category.savingInvestment,
        category.personalSpendings,
        category.essentialSpendings,
        category.debtPayments
      ],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6BC5C0']
    }]
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-center font-bold text-3xl text-white mb-6">
        Expenses by Categories
      </h3>
      
      <div className="flex flex-col items-center gap-6">
        

        <div className="w-full max-w-[500px] h-[500px]">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: { color: 'white' }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensePieChart;