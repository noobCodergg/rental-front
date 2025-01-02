import React, { useContext, useEffect, useState } from 'react';
import { getUser, getUsersNames, markMessagesAsRead } from '../Utils/ChatApi';
import { userContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';

function ChattedUsers() {
  const [users, setUsers] = useState([]);
  const { userId } = useContext(userContext);

  const fetchChattedUsers = async () => {
    try {
      const response = await getUser(userId);

      if (Array.isArray(response.data)) {
        const userIds = response.data.map(chat => chat.userId);

        const nameResponse = await getUsersNames(userIds);
        const usersWithNames = response.data.map((chat) => {
          const userName = nameResponse.data.find((user) => user.userId === chat.userId);
          return {
            ...chat,
            name: userName ? userName.name : 'Unknown User',
          };
        });

        setUsers(usersWithNames);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      console.error('Error occurred while fetching chatted users:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchChattedUsers();
    }
  }, [userId]);

  const roomId = localStorage.getItem("roomId");

  const handleMarkAsRead = async () => {
    try {
      const response = await markMessagesAsRead(roomId);

      setUsers((prevUsers) =>
        prevUsers.map((chat) =>
          chat.roomId === roomId
            ? {
                ...chat,
                latestMessage: {
                  ...chat.latestMessage,
                  isRead: true,
                },
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Error occurred while marking messages as read:", error);
    }
  };

  const checkForNewMessages = (latestMessage) => {
    return latestMessage && !latestMessage.isRead && latestMessage.sender !== userId;
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-red-100 p-6 rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Chatted Users</h2>

      <div className="space-y-6">
        {users.length === 0 ? (
          <p className="text-center text-gray-600 italic">No users found. Start a conversation!</p>
        ) : (
          users.map((chat) => {
            const { latestMessage, userId: otherUserId } = chat;
            const hasUnreadMessages = checkForNewMessages(latestMessage);
            const messageStatus = hasUnreadMessages ? 'unread' : 'read';

            return (
              <Link
                to={`/chat/${otherUserId}/${userId}`}
                onClick={handleMarkAsRead}
                key={chat.roomId}
              >
                <div
                  className={`flex items-center space-x-4 p-5 bg-white rounded-xl shadow-lg transition transform hover:scale-105 hover:shadow-2xl ${messageStatus === 'unread' ? 'border-2 border-blue-400' : ''}`}
                >
                  <img
                    src={chat.picture || 'https://via.placeholder.com/50'}
                    alt={chat.name || 'User'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                  />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-700">{chat.name || 'Unknown User'}</h3>
                    <p className="text-gray-500 text-sm truncate">
                      {latestMessage?.content || 'No message yet'}
                    </p>
                  </div>
                  {hasUnreadMessages && (
                    <span className="text-xs text-white font-semibold py-1 px-3 rounded-full bg-blue-500 animate-pulse">
                      New
                    </span>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ChattedUsers;
