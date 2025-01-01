import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { getSubscriptionEarning } from '../Utils/AdminApi';
import { useNavigate } from 'react-router-dom';

const EarningFromSubscription = () => {
  const [chartData, setChartData] = useState(null); 
  const navigate = useNavigate();

  const fetchSub = async () => {
    try {
      const response = await getSubscriptionEarning(); 

      const { data } = response; 
      const labels = data.labels; 
      const values = data.data; 

     
      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Total Income',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)', 
            borderColor: 'rgba(75, 192, 192, 1)', 
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching subscription earnings:', error);
    }
  };

  useEffect(() => {
    fetchSub();
  }, []);

  
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Income ($)',
        },
        beginAtZero: true,
      },
    },
  };

  const handleClick = () => {
    navigate('/earningfromrent');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Monthly Earnings</h1>
      <p className="text-center text-lg text-gray-600 mb-6">
        Track your total income from subscription plans over time.
      </p>

      {chartData ? (
        <div className="w-full h-96">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="text-center text-gray-600 font-semibold">
          <p>Loading chart...</p>
        </div>
      )}
      
      <div className="flex justify-center mt-6">
        <button
          onClick={handleClick}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
        >
          Go To Earning From Rental
        </button>
      </div>
    </div>
  );
};

export default EarningFromSubscription;

