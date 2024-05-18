import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'


const Navbar = () => {
  const user =false
  return (
    <div className="bg-black flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className='text-lg md:text-x1  font-extrabold '>
        <Link className="text-white" to="/">CodeStore</Link>
      </h1>
      <div className='flex justify-center items-center space-x-0  '>
        <p><BsSearch style={{ color: 'white' }}/></p>
        <input  className='outline-none px-3 rounded sm:w-1/20' placeholder='Search a solution' type="text"></input>
      </div>
      <div className='flex items-center justify-center space-x-2 md:space-x-4'>
        {user? <h3><Link to="/write">Write</Link></h3> :<h3><Link className='text-white' to="/login">Login</Link></h3>}
        {user? <h3><Link to="/">Profile</Link></h3> :<h3><Link className='text-white' to="/register">Register</Link></h3>}
      </div>
    </div>
  )
}

export default Navbar