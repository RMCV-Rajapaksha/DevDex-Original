import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { URL } from '../url';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

function Menu() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/logout", {}, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        setUser(null);
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className='bg-black w-[200px] flex flex-col items-start absolute top-12 md:right-32 right-6 rounded-md p-4'>
      {!user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to='/login'>Login</Link></motion.h3>}
      {!user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to='/register'>Register</Link></motion.h3>}
      {user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to={`/profile/${user._id}`}>Profile</Link></motion.h3>}
      {user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to='/write'>Write</Link></motion.h3>}
      {user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to={`/myblogs/${user._id}`}>My solutions</Link></motion.h3>}
      {user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'><Link to='/chat'>AIChat</Link></motion.h3>}
      {user && <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} onClick={handleLogout} className='m-2 text-sm text-white cursor-pointer md:text-lg hover:text-gray-500'>Logout</motion.h3>}
    </motion.div>
  );
}

export default Menu;
