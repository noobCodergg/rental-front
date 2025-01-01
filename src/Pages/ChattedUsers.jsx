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
    <div className="bg-gray-50 p-4 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Chatted Users</h2>

      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
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
                  className={`flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:bg-gray-100 transition duration-200 ${messageStatus === 'unread' ? 'bg-gray-200' : ''}`}
                >
                  <img
                    src={chat.picture || 'https://via.placeholder.com/50'}
                    alt={chat.name || 'User'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium">{chat.name || 'Unknown User'}</h3>
                    <p className="text-gray-500 text-sm">
                      {latestMessage?.content || 'No message yet'}
                    </p>
                  </div>
                  {hasUnreadMessages && (
                    <span className="text-xs text-blue-500 font-semibold py-1 px-2 rounded-full bg-blue-100">
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
