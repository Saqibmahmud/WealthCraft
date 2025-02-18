'use client'
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import AsideDashboard from '../../../../Components/Aside_Dashbar/page';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend
);

const POPULAR_STOCKS = [
  'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 
  'META', 'NVDA', 'NFLX', 'INTC', 'ADBE'
];

const StockPricesPage = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const currentDate = new Date().toISOString().split('T')[0];
      const pastDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const response = await fetch(
        `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${pastDate}/${currentDate}?apiKey=${process.env.NEXT_PUBLIC_POLYGON_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }

      const data = await response.json();
      
      const formattedData = data.results.map((item: any) => ({
        date: new Date(item.t).toLocaleDateString(),
        close: item.c
      }));

      setStockData(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [stockSymbol]);

  const chartData = {
    labels: stockData.map(item => item.date),
    datasets: [
      {
        label: `${stockSymbol} Stock Price`,
        data: stockData.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${stockSymbol} Stock Price Chart`
      }
    }
  };

  return (
<div className='flex bg-black'>
<AsideDashboard/>

    <div className="container mx-auto px-4 py-8 w-10/12 ml-28">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Popular Stocks</h2>
        <div className="flex flex-wrap gap-2  ml-28">
          {POPULAR_STOCKS.map(stock => (
            <button
              key={stock}
              onClick={() => setStockSymbol(stock)}
              className={`px-3 py-1 rounded ${
                stockSymbol === stock 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {stock}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6 ml-28">
        <input 
          type="text" 
          value={stockSymbol} 
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          placeholder="Enter Stock Symbol"
          className="px-4 py-2 border rounded"
        />
        <button 
          onClick={fetchStockData}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Fetch Data
        </button>
      </div>

      {loading && <p>Loading stock data...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {stockData.length > 0 && (
        <div className="h-[400px] ml-28">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
    </div>
  );
};

export default StockPricesPage;