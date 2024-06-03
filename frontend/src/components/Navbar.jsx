import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useState, useContext } from 'react';
import Menu from './Menu';
import { UserContext } from '../context/UserContext';
import logo from '../assets/images/logo.png'; 
const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="bg-black flex items-center justify-between px-6 md:px-[200px] py-4 w-full fixed top-0 left-0 z-50">
      <h1 className='text-lg font-extrabold md:text-xl'>
        <Link className="text-white " to="/">
        <img src={logo} alt="DevDex Logo" className="w-20 mr-2 h-15" />
          </Link>
      </h1>
      {path === "/" && (
        <div className='flex items-center justify-center space-x-0'>
          <p onClick={() => navigate(prompt ? `?search=${prompt}` : "/")} className='cursor-pointer'>
            <BsSearch style={{ color: 'white' }} />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            className='px-3 rounded-full outline-none'
            placeholder='Search a solution'
            type="text"
          />
        </div>
      )}
      <div className='items-center justify-center hidden space-x-2 md:flex md:space-x-4'>
        {user ? (
          <h3 className='text-white'><Link to="/write">Write</Link></h3>
        ) : (
          <h3><Link className='text-white' to="/login">Login</Link></h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="relative text-white cursor-pointer">
              <FaBars className="text-white cursor-pointer" />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3><Link className='text-white' to="/register">Register</Link></h3>
        )}
      </div>
      <div onClick={showMenu} className='text-lg md:hidden'>
        <p className="text-white cursor-pointer">
          <FaBars className="text-white cursor-pointer" />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
