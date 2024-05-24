import React, { useState,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { URL } from '../url';
import { UserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(URL+'/api/auth/login', {
        email,
        password
      },{withCredentials:true} // to get the token as cookies
    );
      setUser(res.data);
      // console.log(res.data);
      console.log('Login successful');
      navigate('/');
    } catch(e) {
      setError(e.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4 bg-black">
        <h1 className='text-lg md:text-x1  font-extrabold '>
          <Link className='text-white' to="/">CodeStore</Link>
        </h1>
        <h3 className='text-lg md:text-x1  font-extrabold '>
          <Link className='text-white' to="/register">Register</Link>
        </h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Log in to your account</h1>
          <input onChange={(e)=>setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full" type="text" placeholder="Enter your email" />
          <input onChange={(e)=>setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0 rounded-full" type="password" placeholder="Enter your password" />
          <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-500 hover:text-black ">Log in</button>
          {error && <h3 className="text-red-500 text-sm">Some thing is Wrong</h3>}
          <div className="flex justify-center items-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;