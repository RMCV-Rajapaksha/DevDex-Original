import { useContext, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from '../url';
import { useNavigate } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(UserContext);

  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  console.log(file)

  const navigate = useNavigate();

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat("");
    setCats(updatedCats);
  };

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };
const handleCreate=async (e)=>{
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
          const filename=Date.now()+file.name
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
          const res=await axios.post(URL+"/api/posts/create",post,{withCredentials:true})
          navigate("/posts/post/"+res.data._id)
          // console.log(res.data)

        }
        catch(err){
          console.log(err)
        }
    }

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-[100px] mt-20 bg-gray-300 w-[80%] mx-auto rounded-3xl mb-10 py-5">
        <h1 className="font-bold md:text-2xl text-xl mt-10 ">Create solution</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4" onSubmit={handleCreate}>
          <input onChange={(e) => setTitle(e.target.value)} className="px-4 py-2 outline-none border-2 border-black rounded-3xl" type="text" placeholder="Enter post title" />
          <input onChange={(e) => setFile(e.target.files[0])} className="px-4" type="file" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 border-2 border-black rounded-3xl" placeholder="Enter post category" type="text" />
              <div onClick={addCategory} className="bg-black text-white px-4 py-2 font-semibold cursor-pointer  rounded-3xl ">Add</div>
            </div>
            {/* Categories */}
            <div className="flex px-4 mt-3">
              {cats.map((c, i) => (
                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md">
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>
          <textarea onChange={(e) => setDesc(e.target.value)} rows={9} cols={30} className="px-4 py-2 border-2 border-black rounded-3xl" placeholder="Enter Post Description" />
          <button className="bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 pt-2 md:text-xl text-lg rounded-full pb-2">Create</button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default CreatePost;
