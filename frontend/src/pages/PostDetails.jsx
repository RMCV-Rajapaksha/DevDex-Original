import { useParams } from "react-router-dom";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { URL, IF } from '../url';
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import TextToSpeech from "../components/TextToSpeech";

const PostDetails = () => {
  const postId=useParams().id
  const [post,setPost]=useState({})
  const {user}=useContext(UserContext)
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()

  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res=await axios.get(URL+"/api/comments/post/"+postId)
      console.log(res.data)
      setComments(res.data)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPostComments()

  },[postId])



  const fetchPost=async()=>{
    setLoader(true)
    try{
const res = await axios.get(URL+"/api/posts/"+postId)
//console.log(res.data)
setPost(res.data)
setLoader(false)
    }
    catch(err){
console.log(err)
setLoader(true)
    }
  }

  const handleDeletePost=async()=>{
    try{
const res=await axios.delete(URL+"/api/posts/"+postId,{withCredentials:true})
console.log(res.data)
navigate('/')
    }
    catch(err)
    {
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchPost()
  },[postId])

  const postComment=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post(URL+"/api/comments/create",
      {comment:comment,author:user.username,postId:postId,userId:user._id},
      {withCredentials:true})
      console.log(res.data)
      // fetchPostComments()
      // setComment("")
      window.location.reload(true)

    }
    catch(err){
         console.log(err)
    }

  }


  return (
    <div>
      <Navbar />
                {loader?<div className="h-[80vh] flex justify-center items-center m-10"><Loader/></div>:
                  <div className="px-8 md:px-[200px] mt-20 m-10">
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
                    {user?._id===post?.userId && <div className="flex items-center justify-center space-x-2">
                    
                    <p className="cursor-pointer" onClick={()=>navigate("/edit/"+postId)}><BiEdit /></p>
                    <p className="cursor-pointer" onClick={handleDeletePost}><MdDelete /></p>
                  </div>}
                    
                  </div>

                  <div className="flex items-center justify-between mt-2 md:mt-4">
                    <p>@{post.username}</p>
                    <div className="flex space-x-2">
                    <p>{new Date(post.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16,24)}</p>
                    </div>
                  </div>
                  <img src={IF+post.photo} className="w-full mx-auto mt-8 mb-5" alt="" />
                  <TextToSpeech text={post.desc}/>
                  <p className="mx-auto mt-8">{post.desc}</p>
                  <div className="flex items-center mt-8 space-x-4 font-semibold">
                    <p>Categories:</p>
                    <div className="flex items-center justify-center space-x-2">
                      {post.categories?.map((c,i)=>(
          <div key ={i} className="px-3 py-1 bg-gray-300 rounded-lg">{c}</div>
                      ))}
                    
                      
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
                   
                      {/*comment*/}
                      {comments?.map((c)=>(
          <Comments key={c._id} c={c} post={post} />
         ))}
                    {/*write comment*/}
                    <div className="flex flex-col w-full mt-4 md:flex-row">
                      <input  onChange={(e)=>setComment(e.target.value)} type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0  text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white" />
                      <button onClick={postComment} className=" bg-gradient-to-r from-yellow-400 to-pink-600 text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0 rounded-xl">Add Comment</button>
                    </div>
                  </div>
                </div>}
      <Footer />
    </div>
  );
};

export default PostDetails;
