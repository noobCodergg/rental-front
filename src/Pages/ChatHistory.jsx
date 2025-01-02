import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../Context/UserContext";
import { getChatHistory } from "../Utils/ChatApi";

function ChatHistory() {
  const { userId } = useContext(userContext);
  const [data, setData] = useState([]);

  const fetchChatHistory = async () => {
    try {
      const response = await getChatHistory(userId);
      setData(response.data.chats);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Chat History</h1>
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        {data.length === 0 ? (
          <p className="text-center text-gray-500">No chat history available.</p>
        ) : (
          <div className="space-y-4">
            {data.map((item) => (
              <div
                key={item._id}
                className={`border-b border-gray-200 pb-4 mb-4 ${!item.isRead ? "bg-red-300 p-4" : "bg-white"}`}
              >
                <p className="text-lg font-medium text-gray-800">Sender: {item.name}</p>
                <p className="text-sm text-gray-500">Room ID: {item.roomId}</p>
                <p className="text-lg font-medium text-gray-800">{item.content}</p>
                {!item.isRead && (
                  <div className="text-md font-medium text-red-600 mb-2">
                    Unread
                  </div>
                )}
                <p className="text-xs text-gray-400">
                  Sent at: {new Date(item.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatHistory;
