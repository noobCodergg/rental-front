import React from 'react';
import { FaMapMarkerAlt, FaBed, FaDollarSign, FaCalendarAlt, FaVectorSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Cards({ data }) {
    const navigate=useNavigate()
const handleClick=(id)=>{
    navigate(`/propertydetails/${id}`)
}
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{data.propertyName}</h2>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          <span>{data.location}</span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-600">
          <div className="flex items-center">
            <FaDollarSign className="mr-2 text-green-500" />
            <span className="text-sm">Price: ${data.price}</span>
          </div>
          <div className="flex items-center">
            <FaVectorSquare className="mr-2 text-blue-500" />
            <span className="text-sm">Size: {data.propertySize} sqft</span>
          </div>
          <div className="flex items-center">
            <FaBed className="mr-2 text-purple-500" />
            <span className="text-sm">Rooms: {data.roomNumber}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2 text-yellow-500" />
            <span className="text-sm">Date: {data.rentalDate}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 text-center">
        <button onClick={()=>handleClick(data._id)} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">
          View Details
        </button>
      </div>
    </div>
  );
}

export default Cards;
