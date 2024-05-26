import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import axios from 'axios';
import { URL } from '../url';

function Menu() {
  const {user, setUser} = useContext(UserContext)

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", { withCredentials: true })
      console.log(res)
      setUser(null)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 md:right-32 right-6 rounded-md pd-4'>
      {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Login</h3>}
      {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Register</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Profile</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Write</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>My Blog</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>AIChat</h3>}
      {user && <h3 onClick={handleLogout} className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Logout</h3>}
    </div>
  )
}

export default Menu