import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { motion } from 'framer-motion';
import TextToSpeech from "../components/TextToSpeech";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    const res = await axios({
      url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDtlvF-m0virJ7qw1TwA0SJOmuQO5XxQwQ',
      method: 'post',
      data: {
        contents: [{ parts: [{ text: inputValue+"give as a paragraph" }] }]
      }
    });
    const responseText = res.data.candidates[0].content.parts[0].text;
    setMessages([...messages, { sender: 'user', text: inputValue }, { sender: 'bot1', text: responseText }]);
    setInputValue('');
  };

  useEffect(() => {
    setMessages([
      { sender: 'bot', text: "Hello there, adventurer! 🌟 Welcome to our digital realm!" },
      { sender: 'bot', text: "What quests shall we embark on today? Your journey awaits!" }
  ]);
  
  }, []);

  return (
    <>
      <Navbar />
     
      <div className="flex items-center justify-center mt-20 mb-16 overflow-auto flex-grow-col">
        <div className="w-full max-w-4xl p-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`flex mb-4 cursor-pointer ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {message.sender === 'bot' ||   message.sender === 'bot1' ? (
                <>
                  <div className="flex items-center justify-center mr-2 rounded-full w-9 h-9">
                    <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                  </div>
                  <div className="flex max-w-2xl gap-3 p-3 bg-white rounded-lg">
                    <p className="text-gray-700">{message.text}</p>
                   
                  </div>
                  {message.sender ==='bot1'? (<TextToSpeech text={message.text}/>):(<div></div>)}
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
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full px-4 mb-4 m mt-[200px] ">
        <div className="flex flex-col w-full max-w-2xl">
          <motion.input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Type your message..."
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
          value={inputValue}
            className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
            onClick={sendMessage}
            whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg
              className="w-6 h-6 -ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <path d="M20 8v6M23 11h-6" />
            </svg>
            <span className="ml-3">Send</span>
          </motion.button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AiChat;
