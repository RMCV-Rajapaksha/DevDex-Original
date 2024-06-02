import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Spline from '@splinetool/react-spline';
import axios from 'axios';

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [chatboxOpen, setChatboxOpen] = useState(false);

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
      <div className="flex items-center justify-center h-screen mx-20 md:flex-row sm:flex-col sm:p-2">
        <div className="flex flex-col w-full p-5 sm:w-2/3 sm:p-1">
          <div className="p-1 overflow-y-auto border rounded-md h-72 sm:h-96 sm:p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-1 sm:mb-2 ${message.sender === 'user' ? 'text-right' : ''}`}
              >
                <div
                  className={`p-1 sm:p-2 rounded-md ${message.sender === 'user' ? 'bg-blue-200 text-blue-800' : 'bg-gray-300 text-gray-600'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2 border-black sm:mt-4 rounded-2xl">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow p-1 mr-2 border rounded-md sm:p-2"
              placeholder="Type your message..."
            />
            <button
              className="p-3 font-semibold text-white bg-black hover:bg-gray-500 hover:text-black rounded-2xl"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
        <div className="w-[90%] flex justify-center items-center hidden sm:flex h-[70%]">
          <Spline scene="https://prod.spline.design/SkpK-K0Vygyce-1e/scene.splinecode" />
        </div>
      </div>
      <Footer />

      <button
        className="fixed inline-flex items-center justify-center w-16 h-16 p-0 m-0 text-sm font-medium leading-5 normal-case bg-black border border-gray-200 rounded-full cursor-pointer bottom-4 right-4 disabled:pointer-events-none disabled:opacity-50 hover:bg-gray-700 bg-none hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={chatboxOpen}
        data-state={chatboxOpen ? 'open' : 'closed'}
        onClick={() => setChatboxOpen(!chatboxOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="block text-white align-middle border-gray-200">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>

      {chatboxOpen && (
        <div
          style={{ boxShadow: '0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
          className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
        >
          <div className="flex flex-col space-y-1.5 pb-6">
            <h2 className="text-lg font-semibold tracking-tight">Chatbot</h2>
            <p className="text-sm text-[#6b7280] leading-3">Powered by Mendable and Vercel</p>
          </div>

          <div className="pr-4 h-[474px]" style={{ minWidth: '100%', display: 'table' }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                <span className="relative flex w-8 h-8 overflow-hidden rounded-full shrink-0">
                  <div className="p-1 bg-gray-100 border rounded-full">
                    <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                    </svg>
                  </div>
                </span>
                <p className="leading-relaxed">
                  <span className="block font-bold text-gray-700">{message.sender === 'user' ? 'You' : 'AI'}</span>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center pt-0">
            <form className="flex items-center justify-center w-full space-x-2" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input
                className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat;
