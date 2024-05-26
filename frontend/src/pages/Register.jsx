import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import Footer from '../components/Footer';
import Spline from '@splinetool/react-spline';

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
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link className='text-white' to="/">DevDex</Link>
        </h1>
        <h3 className="text-lg md:text-xl font-extrabold">
          <Link className='text-white' to="/login">Login</Link>
        </h3>
      </div>

      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex h-[60vh] w-[80%] md:w-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
            <h1 className="text-xl font-bold text-left mb-4">Create an account</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full mb-4"
              type="text"
              placeholder="Enter your username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full mb-4"
              type="email"
              placeholder="Enter your email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full mb-4"
              type="password"
              placeholder="Enter your password"
            />
            <button
              onClick={handleRegister}
              className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-500 hover:text-black"
            >
              Register
            </button>
            {error && <h3 className="text-red-500 text-sm mt-4">Something is wrong</h3>}
            <div className="flex justify-center items-center space-x-3 mt-4">
              <p>Already have an account?</p>
              <p className="text-gray-500 hover:text-black">
                <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
          <div className="hidden md:block md:w-1/2">
          <Spline scene="https://prod.spline.design/SkpK-K0Vygyce-1e/scene.splinecode" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Register;
