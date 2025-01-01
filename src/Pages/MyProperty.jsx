import React, { useContext, useEffect, useState } from 'react';
import { getPropertyByUserID } from '../Utils/PostApi';
import { userContext } from '../Context/UserContext';
import Cards from '../Components/Cards/Cards';

function MyProperty() {
  const { userId, userName } = useContext(userContext); 
  const [myproperties, setMyProperties] = useState([]);

  const fetchMyProperty = async () => {
    try {
      const response = await getPropertyByUserID(userId);
      setMyProperties(response.data.data);
    } catch (err) {
      console.log("Error occurred while fetching properties.");
    }
  };

  useEffect(() => {
    fetchMyProperty();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-lg mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Welcome, {userName ? userName : "Valued User"}!</h1>
        <p className="text-lg opacity-90">
          We’re glad to have you here. Below are your listed properties. Feel free to manage and explore them.
        </p>
      </div>

      {/* My Properties Section */}
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Your Listed Properties</h2>
        
        {myproperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {myproperties.map((item, index) => (
              <div
                key={index}
                className="transition-transform transform hover:scale-105 hover:shadow-lg rounded-lg overflow-hidden"
              >
                <Cards data={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">You haven't listed any properties yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyProperty;
