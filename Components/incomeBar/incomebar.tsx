'use client';
import { Chart as ChartJs, registerables } from 'chart.js';
ChartJs.register(...registerables);
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getLaastThreemonthIncome, getMonthNames } from '../../lib/transactions';
import { useUser, useAuth } from '@clerk/nextjs';

const IncomeBarChart = () => {
  interface IncomeData {
    currentMonth: number;
    previousMonth: number;
    lastMonth: number;
  }

  const [incomeData, setIncomeData] = useState<IncomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const auth = useAuth();

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        if (user.user?.id) {
          const data = await getLaastThreemonthIncome(user.user.id);
          setIncomeData(data);
        } else {
          throw new Error('User ID is undefined');
        }
      } catch (error) {
        console.error('Error fetching income data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (auth.isSignedIn) {
      fetchIncomeData();
    }
  }, [user.user?.id, auth.isSignedIn]);

  const monthNames = getMonthNames();

  const chartData = {
    labels: [monthNames.twoMonthsAgo, monthNames.previousMonth, monthNames.currentMonth],
    datasets: [
      {
        data: [
          incomeData?.lastMonth || 0,
          incomeData?.previousMonth || 0,
          incomeData?.currentMonth || 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 h-28">
      <h3 className="text-center text-2xl font-bold text-white mb-4">Income Over Last 3 Months</h3>
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="flex justify-center">
          <div className="w-[500px]">
            <Bar
              data={chartData}
              height={150}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeBarChart;
