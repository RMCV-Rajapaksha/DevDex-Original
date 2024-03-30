import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { ImCross } from "react-icons/im"




export const CreatePost = () => {
  return (
    <div>
        <Navbar/>
        <div className="px-6 md:px-[200px] mt-8">
          <h1 className="font-bold md:text-2xl text-xl mt-8">Create solution</h1>
<form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
  <input className="px-4 py-2 outline-none" type="text" placeholder="Enter post title" />
  <input className="px-4 " type="file" placeholder="Enter post title" />
  <div className="flex flex-col">
    <div className="flex items-center space-x-4 md:space-x-8">
      <input className="px-4 py-2 outline-none" placeholder="Enter post category" type="text"/>
      <div className="bg-black text-white px-4 py-2 font-semibold cursor-pointer ">Add</div>
    </div>
    <div className="flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md ">
      <p>tech</p>
      <ImCross/>
    </div>
  </div>
</form>
        </div>
        <Footer/>
    </div>
  )
}
