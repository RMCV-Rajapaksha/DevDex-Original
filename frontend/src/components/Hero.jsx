import React from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { URL } from '../url';

function Hero() {

  const checkout = () => {
    
  };

  const container = {
    hidden: { opacity: 0, y: -30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration : 2,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-screen h-screen ms:h-[80vh] md:h-[80vh] bg-black">
      <div className="max-w-5xl pt-16 mx-auto sm:pt-24">
        <motion.div
          className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            className="px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left"
            variants={item}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="rounded-full uppercase bg-pink-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                    From Bugs to Brilliance
                  </span>
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                    Welcome to <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600">DevDex</span>
                    <br />
                    Your Coding Problem Solver
                  </h1>
                </div>
                <p className="text-base text-gray-200 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Join a community of developers, solve coding problems, and get instant help from our AI-powered chatbot.
                </p>
              </div>
              <div className="border-t border-gray-700"></div>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img loading="lazy" width="400" height="400" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/29.jpg" alt="User 1" />
                    <img loading="lazy" width="400" height="400" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/90.jpg" alt="User 2" />
                    <img loading="lazy" width="100" height="100" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/75.jpg" alt="User 3" />
                    <img loading="lazy" width="200" height="200" decoding="async"
                      className="w-6 h-6 rounded-full max-w-none ring-2 ring-white"
                      style={{ color: "transparent" }} src="https://randomuser.me/api/portraits/men/5.jpg" alt="User 4" />
                  </div>
                  <span className="flex-shrink-0 text-xs font-medium leading-5">+15</span>
                </div>
                <div className="h-4 border-l border-gray-700"></div>
                <div className="flex items-center">
                  {/* You may add additional elements here */}
                </div>
                <button
                  onClick={checkout}
                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
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
                  <span className="ml-3">Buy me a coffee</span>
                </button>
                
              </div>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center w-full col-span-6"
            variants={item}
          >
            <div className="flex items-center w-full max-w-2xl col-span-6 px-6 mx-auto h-96 lg:h-full">
              <div style={{ width: "100%", height: "100%" }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <iframe frameBorder="0" allowFullScreen="1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    width="100%" height="100%"
                    src="https://www.youtube.com/embed/mr15Xzb1Ook?autoplay=0&amp;mute=0&amp;controls=0&"
                    id="widget2">
                  </iframe>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Hero;
