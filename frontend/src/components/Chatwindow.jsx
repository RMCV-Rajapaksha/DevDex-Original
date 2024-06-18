import React, { useState } from 'react';
import axios from 'axios';

const ChatButton = ({ toggleChatbox }) => (
  <div className="fixed bottom-0 right-0 mb-4 mr-4">
    <button
      onClick={toggleChatbox}
      className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Check your code with our AI
    </button>
  </div>
);

const ChatContainer = ({ isOpen, toggleChatbox }) => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDtlvF-m0virJ7qw1TwA0SJOmuQO5XxQwQ',
        {
          contents: [{ parts: [{ text: userMessage + " give as a paragraph" }] }]
        }
      );
      const responseText = res.data.candidates[0].content.parts[0].text;
      setMessages([...messages, { sender: 'user', text: userMessage }, { sender: 'bot1', text: responseText }]);
      const evaluation = evaluateCode(userMessage); // Evaluate the user input
      addBotMessage(evaluation); // Add evaluation message
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setUserMessage('');
  };

  const evaluateCode = (code) => {
    // Replace this with your actual evaluation logic
    // For example, a basic check could be:
    if (code.includes('good')) {
      return 'Good code!';
    } else {
      return 'Bad code :(';
    }
  };

  const addUserMessage = (message) => {
    setMessages([...messages, { text: message, user: true }]);
  };

  const addBotMessage = (message) => {
    setMessages([...messages, { text: message, user: false }]);
  };

  const handleSend = () => {
    if (userMessage.trim()) {
      addUserMessage(userMessage);
      sendMessage(); // Send message to API and evaluate
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className={`fixed bottom-16 right-4 w-96 ${isOpen ? "" : "hidden"}`}>
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between p-4 text-white bg-blue-500 border-b rounded-t-lg">
          <p className="text-lg font-semibold">Admin Bot</p>
          <button onClick={toggleChatbox} className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-80">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-2 ${msg.user ? "text-right" : ""}`}>
              <p className={`rounded-lg py-2 px-4 inline-block ${msg.user ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex p-4 border-t">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend} className="px-4 py-2 text-white transition duration-300 bg-black rounded-r-md hover:bg-blue-600">Send</button>
        </div>
      </div>
    </div>
  );
};

const ChatApp = () => {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  return (
    <div>
      <ChatButton toggleChatbox={toggleChatbox} />
      <ChatContainer isOpen={isChatboxOpen} toggleChatbox={toggleChatbox} />
    </div>
  );
};

export default ChatApp;
