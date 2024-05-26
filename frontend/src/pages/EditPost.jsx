import { useContext, useEffect, useState } from "react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from "react-icons/im"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { URL} from '../url';
import { UserContext } from "../context/UserContext"

const EditPost = () => {
  const postId = useParams().id
const {user}=useContext(UserContext)
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("")
  const [cats, setCats] = useState([])
  const navigate=useNavigate()

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL+"/api/posts/"+postId)
      console.log(res.data)
     
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFile(res.data.photo)
      setCats(res.data.categories || []) // Ensure categories is an array
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const post={
      title,
      desc,
      username:user.username,
      userId:user._id,
      categories:cats
    }

    if(file){
      const data=new FormData()
      const filename=file.name
      data.append("img",filename)
      data.append("file",file)
      post.photo=filename
      // console.log(data)
      //img upload
      try{
        const imgUpload=await axios.post(URL+"/api/upload",data)
        // console.log(imgUpload.data)
      }
      catch(err){
        console.log(err)
      }
    }
    //post upload
    // console.log(post)
    try{
      const res=await axios.put(URL+"/api/posts/"+postId,post,{withCredentials:true})
      navigate("/posts/post/"+res.data._id)
      // console.log(res.data)

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [postId])

  const addCategory = () => {
    let updatedCats = [...cats]
    updatedCats.push(cat)
    setCat("")
    setCats(updatedCats)
  }

  const deleteCategory = (i) => {
    let updatedCats = [...cats]
    updatedCats.splice(i, 1)
    setCats(updatedCats)
  }

  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-[200px] mt-8 bg-gray-300 w-[90%] mx-auto rounded-3xl mb-10">
        <h1 className="font-bold md:text-2xl text-xl mt-8 pt-5">Update solution</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input onChange={(e) => setTitle(e.target.value)} value={title} className="px-4 py-2 outline-none border-2 border-black rounded-3xl" type="text" placeholder="Enter post title" />
          <input onChange={(e) => setFile(e.target.files[0])} className="px-4 " type="file" placeholder="Enter post title" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 outline-none border-2 border-black rounded-3xl" placeholder="Enter post category" type="text"/>
              <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer ">Add</div>
            </div>
            <div className="flex px-4 mt-3">
               {cats.length > 0 && cats.map((c, i) => (
                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md ">
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">  <ImCross/></p>
                </div>
              ))} 
            </div>
          </div>
          <textarea onChange={(e) => setDesc(e.target.value)} value={desc} rows={15} cols={30} className="px-4 py-2 outline-none border-2 border-black rounded-3xl " placeholder="Enter Post Description"/>
          <button onClick={handleUpdate} className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 pt-2 md:text-xl text-lg rounded-full "> Update </button>
        </form>
      </div>
      <Footer/>
    </>
  )
}

export default EditPost
