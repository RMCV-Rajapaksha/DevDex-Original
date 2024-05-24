import { Link, useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useState,useContext } from 'react'
import Menu from './Menu'
import { UserContext } from '../context/UserContext'


const Navbar = () => {
  const [prompt,setPromt]=useState("")
  const[menu, setMenu] = useState(false)
  const navigate=useNavigate()
  console.log(prompt)


  const showMenu = () => {
    setMenu(!menu)
  }

  const {user} =useContext(UserContext)
  console.log(user)

  return (
    <div className="bg-black flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className='text-lg md:text-x1  font-extrabold '>
        <Link className="text-white" to="/">CodeStore</Link>
      </h1>
      <div className='flex justify-center items-center space-x-0  '>
        <p onClick={()=>navigate(prompt?"?search"+prompt:navigate("/"))} className='cursor-pointer'><BsSearch style={{ color: 'white' }}/></p>
        <input onChange={(e)=>setPromt(e.target.value)}  className='outline-none px-3 rounded-full' placeholder='Search a solution' type="text"></input>
      </div>
      <div className='hidden md:flex items-center justify-center space-x-2 md:space-x-4'>
        {user? <h3 className='text-white'><Link to="/write">Write</Link></h3> :<h3><Link className='text-white' to="/login">Login</Link></h3>}
        {user? <div onClick={showMenu}>
          <p className="text-white cursor-pointer relative">
        <FaBars className="text-white cursor-pointer" />
        </p>
          {menu && <Menu/>}
        </div>   :<h3><Link className='text-white' to="/register">Register</Link></h3>}
      </div>
      <div onClick={showMenu} className='md:hidden text-lg'>
        <p className="text-white cursor-pointer"s>
        <FaBars className="text-white cursor-pointer" />
        </p>
{menu && <Menu/>}
      </div>
    </div>
  )
}

export default Navbar