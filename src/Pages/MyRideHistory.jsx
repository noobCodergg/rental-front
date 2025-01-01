import React, { useContext, useEffect, useState } from 'react'
import { getRideHistory } from '../Utils/RideApi'
import { userContext } from '../Context/UserContext'

function MyRideHistory() {
  const { userId } = useContext(userContext)
  const [data, setData] = useState([])

  const fetchRideHistory = async () => {
    try {
      const response = await getRideHistory(userId)
      setData(response.data)
    } catch (error) {
      console.log("Error")
    }
  }

  useEffect(() => {
    fetchRideHistory()
  }, [])

  return (
    <div className="container mx-auto p-4">
      {data.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No ride history available.</p>
      ) : (
        data.map((item, index) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-6 mb-4">
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-semibold text-gray-800">Driver: {item.driverName}</h3>
              <p className="text-gray-600">Email: {item.driverEmail}</p>
              <p className="text-green-600 font-medium">Status: Completed</p>
              <p className="text-gray-500">Ride Time: {new Date(item.time).toLocaleString()}</p>
              <p className="text-gray-400">Ride ID: {item._id}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default MyRideHistory
