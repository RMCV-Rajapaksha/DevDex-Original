import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    const res = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDtlvF-m0virJ7qw1TwA0SJOmuQO5XxQwQ',
      method: 'post',
      data: {
        contents: [{ parts: [{ text: inputValue }] }]
      }
    });
    const responseText = res.data.candidates[0].content.parts[0].text;
    setMessages([...messages, { sender: 'user', text: inputValue }, { sender: 'bot', text: responseText }]);
    setInputValue('');
  };

  return (
    <>
      <Navbar />
      <div className="fixed top-0 flex items-center justify-between w-full h-16 pt-2 text-white bg-green-400 shadow-md">
        <button onClick={() => window.history.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-12 h-12 my-1 ml-2 text-green-100"
          >
            <path
              className="text-green-100 fill-current"
              d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
            />
          </svg>
        </button>
        <div className="my-3 text-lg font-bold tracking-wide text-green-100">@rallipi</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 mt-2 mr-2 icon-dots-vertical"
        >
          <path
            className="text-green-100 fill-current"
            fillRule="evenodd"
            d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          />
        </svg>
      </div>

      <div className="flex items-center justify-center flex-grow mt-20 mb-16 overflow-auto">
        <div className="w-full max-w-4xl p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex justify-center mb-4 cursor-pointer">
              {message.sender === 'bot' ? (
                <>
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="flex max-w-2xl gap-3 p-3 bg-white rounded-lg">
                    <p className="text-gray-700">{message.text}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end max-w-2xl gap-3 p-3 text-white bg-indigo-500 rounded-lg">
                    <p>{message.text}</p>
                  </div>
                  <div className="flex items-center justify-center ml-2 rounded-full w-9 h-9">
                    <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full px-4 mb-4">
        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-grow p-2 border rounded-md"
            placeholder="Type your message..."
          />
          <button
            className="p-3 ml-2 font-semibold text-white bg-black hover:bg-gray-500 hover:text-black rounded-2xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AiChat;
