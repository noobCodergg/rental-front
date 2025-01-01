import React, { useEffect, useState } from 'react';
import { getSugg } from '../Utils/AdminApi';

function ManageReports() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getSugg();
      setData(response.data);
    } catch (error) {
      console.log('Error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Manage Suggestions And Reports</h2>
      <div className="flex gap-8">
        {/* Suggestions Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-gray-700">Suggestions</h3>
          <div className="flex flex-col gap-4">
            {data
              .filter(item => item.type === 'sugg')
              .map((item, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-lg">
                  <p className="text-lg font-medium text-gray-700">
                    Suggested By: <span className="font-normal">{item.userId}</span>
                  </p>
                  <p className="text-lg text-gray-600">
                    Subscription Plan Id: <span className="font-normal">{item.id}</span>
                  </p>
                  <p className="text-lg text-gray-600">
                    Suggestion: <span className="font-normal">{item.content}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Reports Section */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 text-red-700">Reports</h3>
          <div className="flex flex-col gap-4">
            {data
              .filter(item => item.type !== 'sugg')
              .map((item, index) => (
                <div
                  key={index}
                  className="border border-red-300 rounded-lg p-4 shadow-lg bg-red-100"
                >
                  <p className="text-lg font-medium text-red-700">
                    Reported By: <span className="font-normal">{item.userId}</span>
                  </p>
                  <p className="text-lg text-red-700">
                    Reported To: <span className="font-normal">{item.id}</span>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageReports;
