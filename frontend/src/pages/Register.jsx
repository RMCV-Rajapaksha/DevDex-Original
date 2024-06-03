import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import logo_black from '../assets/images/logo_black.png'; 
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
              <div>
              <img src={logo_black} className="w-32 mx-auto" alt="Logo" />
                </div>
              <div className="flex flex-col items-center mt-12">
                <h1 className="text-2xl font-extrabold xl:text-3xl">
                  Sign up
                </h1>
                <div className="flex-1 w-full mt-8">
                  <div className="flex flex-col items-center">
                    <button
                      className="flex items-center justify-center w-full max-w-xs py-3 font-bold text-gray-800 transition-all duration-300 ease-in-out bg-indigo-100 rounded-lg shadow-sm focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                    >
                      <div className="p-2 bg-white rounded-full">
                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                          <path
                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                            fill="#4285f4"
                          />
                          <path
                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                            fill="#34a853"
                          />
                          <path
                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                            fill="#fbbc04"
                          />
                          <path
                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                            fill="#ea4335"
                          />
                        </svg>
                      </div>
                      <span className="ml-4">
                        Sign Up with Google
                      </span>
                    </button>
                  </div>

                  <div className="my-12 text-center border-b">
                    <div className="inline-block px-2 text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-1/2 bg-white">
                      Or sign up with e-mail
                    </div>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-8 py-4 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Username"
                    />
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                    />
                    <button
                      onClick={handleRegister}
                      className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                    >
                      <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">
                        Sign Up
                      </span>
                    </button>
                    {error && <h3 className="mt-4 text-sm text-red-500">Something went wrong: {error}</h3>}
                    <p className="mt-6 text-xs text-center text-gray-600">
                      I agree to abide by templatana's
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Terms of Service
                      </a>
                      and its
                      <a href="#" className="border-b border-gray-500 border-dotted">
                        Privacy Policy
                      </a>
                    </p>
                    <div className="flex items-center justify-center mt-4 space-x-3">
                      <p>Already have an account?</p>
                      <p className="text-gray-500 hover:text-black">
                        <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 hidden text-center bg-indigo-100 lg:flex">
              <div className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
                style={{ backgroundImage: 'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")' }}>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
