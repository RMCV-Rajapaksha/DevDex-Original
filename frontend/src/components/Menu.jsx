
import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'

function Menu() {
  const {user}=useContext(UserContext)
  return (
    <div className='bg-black w-[200px] flex flex-col items-start absolute top-12 md:right-32 right-6 rounded-md pd-4'>
     {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Login</h3>}
      {!user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Register</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Profile</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Write</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>My Blog</h3>}
      {user && <h3 className='text-white text-sm md:text-lg hover:text-grey-500 m-2 cursor-pointer'>Logout</h3>}
    
    
    
    
    </div>
  )
}

export default Menu