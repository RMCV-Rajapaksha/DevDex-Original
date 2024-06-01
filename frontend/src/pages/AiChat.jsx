import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spline from '@splinetool/react-spline';
import axios from "axios";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    const res = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDtlvF-m0virJ7qw1TwA0SJOmuQO5XxQwQ",
      method: "post",
      data: {
        "contents": [{"parts": [{"text": inputValue}]}]
      }
    });
    const responseText = res['data']['candidates'][0]['content']['parts'][0]['text'];
    setMessages([...messages, { sender: 'user', text: inputValue }, { sender: 'bot', text: responseText }]);
    setInputValue('');
  };

  return (
    <>
      <Navbar />
      <div className="flex md:flex-row  sm:flex-col h-screen items-center justify-center mx-20 sm:p-2 ">
        <div className="w-full sm:w-2/3 flex flex-col p-5 sm:p-1">
          <div className="overflow-y-auto h-72 sm:h-96 border rounded-md p-1 sm:p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-1 sm:mb-2 ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}
              >
                <div
                  className={`p-1 sm:p-2 rounded-md ${
                    message.sender === 'user'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-2 sm:mt-4 border-black rounded-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow p-1 sm:p-2 border rounded-md mr-2"
              placeholder="Type your message..."
            />
            <button
              className="text-white hover:bg-gray-500 hover:text-black bg-black p-3 rounded-2xl font-semibold"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>

        <div class="w-[90%] flex justify-center items-center hidden sm:flex h-[70%]">
        <Spline scene="https://prod.spline.design/SkpK-K0Vygyce-1e/scene.splinecode" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AiChat;