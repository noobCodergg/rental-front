import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getChat, postChat } from "../Utils/ChatApi"; 
import { userContext } from "../Context/UserContext";


function Chat() {
  const { id, userId } = useParams(); 
  const {myId,userName}=useContext(userContext)
  const loggedInUserId = userId; 
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]); 
  const [data, setData] = useState([]); 
const navigate=useNavigate();
  const fetchChat = async () => {
    try {
      const response = await getChat(id, loggedInUserId);
      setData(response.data);
      setChatMessages(response.data);
    } catch (error) {
      console.log("Error occurred while fetching chat");
    }
  };

  useEffect(() => {
    if(myId!=userId){
      navigate('/unauthorized')
    }
    fetchChat();
  }, [id, loggedInUserId]);

  useEffect(() => {
    const newSocket = io("http://localhost:8000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 5000,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      const roomId = [loggedInUserId, id].sort().join("-");
      newSocket.emit("join", roomId);
    });

    newSocket.on("newMsg", (incomingMessage) => {
      setChatMessages((prev) => [...prev, incomingMessage]);
      setData((prevData) => [...prevData, incomingMessage]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [id, loggedInUserId]);

  const sendMessage = async () => {
    if (!message.trim() || !socket) return;

    const newMessage = {
      content: message,
      sender: loggedInUserId,
      receiver: id,
      timestamp: new Date(),
      roomId: [loggedInUserId, id].sort().join("-"),
      isRead: false,
      name: userName
    };

    localStorage.setItem('roomId', [loggedInUserId, id].sort().join("-"));
    socket.emit("privateMsg", newMessage);

    try {
      const response = await postChat(newMessage);
    } catch (error) {
      console.error("Error while posting message:", error);
    }

    setMessage("");
  };

  useEffect(() => {
    const chatContainer = document.querySelector(".flex-grow");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="text-xl font-bold text-center mb-4 py-2"></header>

      <div className="flex-grow overflow-y-auto px-4 pb-20">
        <div className="space-y-4">
          {data.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === loggedInUserId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg text-sm text-gray-800 shadow-md ${
                  msg.sender === loggedInUserId
                    ? "bg-blue-600 text-white"
                    : "bg-white text-black"
                }`}
              >
                <p>{msg.content}</p>
                <small className="text-xs text-gray-400">
                  {msg.time}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-lg flex items-center space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </footer>
    </div>
  );
}

export default Chat;
