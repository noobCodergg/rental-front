import React, { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 
import { getRentalEarningUser } from '../Utils/AdminApi';
import { userContext } from '../Context/UserContext';

const MyEarnings = () => {
 const {userId}=useContext(userContext)
  const [chartData, setChartData] = useState(null);

  const fetchSub = async () => {
    try {
      const response = await getRentalEarningUser(userId);
    

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

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Monthly Earnings</h1>
      <p className="text-center text-lg text-gray-600 mb-4">Track your total income from subscription plans over time</p>

      {chartData ? (
        <div className="w-full h-96">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <div className="text-center text-gray-600 font-semibold">
          <p>Loading chart...</p>
        </div>
      )}
    </div>
  );
};

export default MyEarnings;