import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useState, useContext } from 'react';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import logo from '../assets/images/logo.png';
import { motion } from "framer-motion";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  console.log(prompt);
  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <motion.div 
      className="bg-black flex items-center justify-between px-6 md:px-[200px] py-4 w-full fixed top-0 left-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='text-lg font-extrabold md:text-xl'>
        <Link className="text-white " to="/">
          <motion.img 
            whileHover={{ scale: 1.2, originX: 0 }} 
            src={logo} 
            alt="DevDex Logo" 
            className="w-20 mr-2 h-15" 
          />
        </Link>
      </h1>
      {path === "/" && (
        <motion.div 
          className='flex items-center justify-center space-x-0'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p 
            whileHover={{ scale: 1.2, originX: 0 }} 
            onClick={() => navigate(prompt ? "?search="+prompt : "/")} 
            className='m-3 cursor-pointer'
          >
            <BsSearch style={{ color: 'white' }} />
          </motion.p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className='px-3 rounded-full outline-none'
            placeholder='Search a solution'
            type="text"
          />
        </motion.div>
      )}
      <div className='items-center justify-center hidden space-x-2 md:flex md:space-x-4'>
        {user ? (
          <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='text-white'>
            <Link to="/write">Write</Link>
          </motion.h3>
        ) : (
          <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='text-white'>
            <Link to="/login">Login</Link>
          </motion.h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <motion.p 
              whileHover={{ scale: 1.2, originX: 0 }} 
              className="relative text-white cursor-pointer"
            >
              <FaBars className="text-white cursor-pointer" />
            </motion.p>
            {menu && <Menu />}
          </div>
        ) : (
          <motion.h3 whileHover={{ scale: 1.2, originX: 0 }} className='text-white'>
            <Link to="/register">Register</Link>
          </motion.h3>
        )}
      </div>
      <div onClick={showMenu} className='text-lg md:hidden'>
        <motion.p 
          whileHover={{ scale: 1.2, originX: 0 }} 
          className="text-white cursor-pointer"
        >
          <FaBars className="text-white cursor-pointer" />
        </motion.p>
        {menu && <Menu />}
      </div>
    </motion.div>
  );
};

export default Navbar;
