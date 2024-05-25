import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';
import Spline from '@splinetool/react-spline';
import Navbar from '../components/Navbar'; // Import the Navbar component

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL + '/api/auth/login', {
        email,
        password
      }, { withCredentials: true } // to get the token as cookies
      );
      setUser(res.data);
      console.log('Login successful');
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div className="pt-20"> {/* Adjust for fixed Navbar */}
        <div className="w-full flex justify-center items-center h-[80vh]">
          <div className="flex h-[60vh] w-[80%] md:w-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
              <h1 className="text-xl font-bold text-left mb-4">Log in to your account</h1>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full mb-4"
                type="text"
                placeholder="Enter your email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full mb-4"
                type="password"
                placeholder="Enter your password"
              />
              <button
                onClick={handleLogin}
                className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-500 hover:text-black"
              >
                Log in
              </button>
              {error && <h3 className="text-red-500 text-sm mt-4">Something is wrong</h3>}
              <div className="flex justify-center items-center space-x-3 mt-4">
                <p>New here?</p>
                <p className="text-gray-500 hover:text-black">
                  <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <Spline scene="https://prod.spline.design/SkpK-K0Vygyce-1e/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
