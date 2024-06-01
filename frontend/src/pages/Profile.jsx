import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ProfilePosts from "../components/ProfilePosts"
import axios from "axios"
import { IF, URL } from "../url"
import { UserContext } from "../context/UserContext"
import { useNavigate, useParams } from "react-router-dom"

const Profile = () => {
  const param=useParams().id
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const {user,setUser}=useContext(UserContext)
  const navigate=useNavigate()
  const [posts,setPosts]=useState([])
  const [updated,setUpdated]=useState(false)

  
const fetchProfile=async ()=>{
  try{
     const res=await axios.get(URL+"/api/users/"+user._id)
     setUsername(res.data.username)
     setEmail(res.data.email)
     setPassword(res.data.password)
  }
  catch(err){
     console.log(err)
  }
}

const handleUserUpdate=async ()=>{
  setUpdated(false)
  try{
    const res=await axios.put(URL+"/api/users/"+user._id,{username,email,password},{withCredentials:true})
    // console.log(res.data)
    setUpdated(true)

  }
  catch(err){
    console.log(err)
    setUpdated(false)
  }

}

const handleUserDelete=async()=>{
  try{
    const res=await axios.delete(URL+"/api/users/"+user._id,{withCredentials:true})
    setUser(null)
    navigate("/")
    // console.log(res.data)

  }
  catch(err){
    console.log(err)
  }
}
// console.log(user)
const fetchUserPosts=async ()=>{
  try{
    const res=await axios.get(URL+"/api/posts/user/"+user._id)
    // console.log(res.data)
    setPosts(res.data)


  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  fetchProfile()

},[param])

useEffect(()=>{
  fetchUserPosts()

},[param])

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-20 flex md:flex-row flex-col-reverse md:items-start items-center">
        <div className="flex flex-col md:w-[70%] w-full mt-4 md:mt-8">
          <h1 className="text-xl font-bold mb-3">Your posts:</h1>
          {posts?.map((p)=>(
            <ProfilePosts key={p._id} p={p}/>
          ))}
        </div>
        <div className="md:sticky  md-top16 flex justify-center items-center md:w-[30%] m-full  md:items-start p-5 bg-gray-300 rounded-3xl mx-10 mt-20">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input onChange={(e)=>setUsername(e.target.value)} value={username} className="outline-none px-4 py-2 text-gray-500 border-2 border-black rounded-full " placeholder="Your username" type="text" />
            <input  onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none px-4 py-2 text-gray-500 border-black rounded-full" placeholder="Your email" type="email" />
            <input  onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none px-4 py-2 text-gray-500  border-black rounded-full" placeholder="Your password" type="password" />
            <div className="flex items-center space-x-4 mt-8">
              <button  onClick={handleUserUpdate}  className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Save</button>
              <button  onClick={handleUserDelete} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Cancel</button>
            </div>
            {updated && <h3 className="text-green-500 text-sm text-center mt-4">user updated successfully!</h3>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
