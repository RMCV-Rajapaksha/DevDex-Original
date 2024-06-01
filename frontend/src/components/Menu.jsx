import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import { URL } from '../url';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
  const {user, setUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/logout", { withCredentials: true })
      console.log(res)
      if (res.status === 200) {
        setUser(null)
        navigate('/login')
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 md:right-32 right-6 rounded-md pd-4'>
      {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer' ><Link to='/login'>Login</Link> </h3>}
      {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'><Link to='/register'>Register</Link></h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'><Link to={`/profile/${user._id}`}>Profile</Link></h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'><Link to='/write'>Write</Link></h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'><Link to={`/myblogs/${user._id}`}>My solutions</Link></h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'><Link to='/chat'>AIChat</Link></h3>}
      {user && <h3 onClick={handleLogout} className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Logout</h3>}
    </div>
  )
}

export default Menu