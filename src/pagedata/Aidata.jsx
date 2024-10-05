import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot } from "react-icons/fa";
import { RiUserVoiceFill } from "react-icons/ri";

const Aidata = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!userMessage) return;  

    try {
      const response = await axios.post('https://a-ichatbot-delta.vercel.app/chat', {
        userMessage: userMessage,
      });
      
      const newHistoryItem = {
        user: userMessage,
        response: response.data.response,
      };
      setChatHistory((prevHistory) => [...prevHistory, newHistoryItem]);

      setUserMessage('');
      setChatResponse(response.data.response);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      setChatResponse("Error in generating response.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
      <h1 className="text-2xl font-bold text-center">Farmingo Ai</h1>
      

      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="userMessage" className="block text-sm font-medium text-gray-700">Ask all your Doubts related to Farming</label>
        <div className="flex mt-1">
          <input
            type="text"
            id="userMessage"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            required
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button type="submit" className="ml-2 px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700">Send</button>
        </div>
      </form>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Chatbot Response:</h2>
        <p className="mt-2 p-2 border border-gray-200 rounded-md">{chatResponse}</p>
      </div>

      <button 
        onClick={() => setShowHistory(!showHistory)} 
        className="mt-4 w-full px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {showHistory && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Chat History:</h2>
          <ul className="mt-2 border border-gray-200 rounded-md">
            {chatHistory.map((item, index) => (
              <li key={index} className="p-2 border-b last:border-b-0">
                <strong className="text-teal-600"><RiUserVoiceFill color='black'/> {item.user}</strong> <br />
                <strong className="text-teal-600"><FaRobot color='black'/>{item.response}</strong> 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Aidata;
