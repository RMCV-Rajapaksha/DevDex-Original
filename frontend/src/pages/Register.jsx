import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import logo_black from '../assets/images/logo_black.png'; 
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: -30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 2,
    }
  }
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 }
};

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + '/api/auth/register', {
        username,
        email,
        password
      });
      setUsername('');
      setEmail('');
      setPassword('');
      setError(false);
      navigate('/login');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="pt-20"> 
        <div className="flex justify-center min-h-screen text-gray-900 bg-gray-100">
          <div className="flex justify-center flex-1 max-w-screen-xl m-0 bg-white shadow sm:m-10 sm:rounded-lg">
            <div className="p-6 lg:w-1/2 xl:w-5/12 sm:p-12">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
              >
                <motion.img  
                  variants={item} 
                  src={logo_black} 
                  className="w-32 mx-auto" 
                  alt="Logo" 
                />
                <motion.div 
                  variants={item} 
                  className="flex flex-col items-center mt-12"
                >
                  <h1 className="text-2xl font-extrabold xl:text-3xl">Sign up</h1>
                  <div className="flex-1 w-full mt-8">
                    <motion.div 
                      variants={item} 
                      className="my-12 text-center border-b"
                    >
                      <div className="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-1/2 bg-white">
                        Or sign up with e-mail
                      </div>
                    </motion.div>

                    <motion.div 
                      variants={item}
                      className="max-w-xs mx-auto"
                    >
                      <motion.input
                        variants={item}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-8 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="text"
                        placeholder="Username"
                      />
                      <motion.input
                        variants={item}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="email"
                        placeholder="Email"
                      />
                      <motion.input
                        variants={item}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                        type="password"
                        placeholder="Password"
                      />
                      <motion.button
                        variants={item}
                        
                        whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
                        onClick={handleRegister}
                        className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                      >
                        <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign Up</span>
                      </motion.button>
                      {error && <h3 className="mt-4 text-sm text-red-500">Something went wrong: {error}</h3>}
                      <p className="mt-6 text-xs text-center text-gray-600">
                        I agree to abide by templatana's
                        <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                        and its
                        <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                      </p>
                      <div className="flex items-center justify-center mt-4 space-x-3">
                        <p>Already have an account?</p>
                        <p className="text-gray-500 hover:text-black">
                          <Link to="/login">Login</Link>
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="flex-1 hidden text-center bg-indigo-100 lg:flex">
              <div className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
                style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
