import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

const PostDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black md:text-3xl">hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="cursor-pointer"><BiEdit /></p>
            <p className="cursor-pointer"><MdDelete /></p>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
          <p>@hfxfch</p>
          <div className="flex space-x-2">
            <p>16/05/2024</p>
            <p>16:45</p>
          </div>
        </div>
        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg" className="w-full mx-auto mt-8" alt="" />
        <p className="mx-auto mt-8">In today's fast-paced world, people often share photos and videos of their journeys, but the lack of a centralized platform for sharing these visual memories can hinder communication, especially for non-tech-savvy family members who may struggle to switch between social media platforms or use different networks.
          Conventional event photography often relies on a single photographer or small crew, resulting in missed opportunities and high costs. A more inclusive, affordable solution encourages participants to contribute their images and films, providing a dynamic view of the event. This platform creates a collaborative, immersive experience that satisfies user preferences and makes sharing simple for those unfamiliar with social networking platforms.
          A platform that integrates real-time photographs and videos of participants benefits businesses and individuals by creating a collaborative and immersive experience, satisfying diverse user preferences, and making sharing simpler for those unfamiliar with different social networking platforms.</p>
        <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-gray-300 rounded-lg px-3 py-1">tech</div>
            <div className="bg-gray-300 rounded-lg px-3 py-1">java</div>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
          <div className="px-2 py-2 bg-gray-200 rounded-lg ">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-600">@jsjvk;odfm</h3>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-gray-500">18/04/2024</p>
                <p className="text-gray-500">16:45</p>
              </div>
            </div>
          </div>
            {/*comment*/}
          <Comments />
          <Comments />
          {/*write comment*/}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input type="text" placeholder="Write a comment" className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0" />
            <button className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">Add Comment</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostDetails;
