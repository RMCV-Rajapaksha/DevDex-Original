import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-center">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-8">
          <h1 className="text-xl font-bold mb-4">Your posts:</h1>
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
          <ProfilePosts />
        </div>
        <div className="md:sticky  md-top16 flex justify-center items-center md:w-[30%] m-full  md:items-start p-5 bg-gray-300 rounded-3xl mx-10">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input className="outline-none px-4 py-2 text-gray-500 border-2 border-black rounded-full " placeholder="Your username" type="text" />
            <input className="outline-none px-4 py-2 text-gray-500 border-black rounded-full" placeholder="Your email" type="email" />
            <input className="outline-none px-4 py-2 text-gray-500  border-black rounded-full" placeholder="Your password" type="password" />
            <div className="flex items-center space-x-4 mt-8">
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Save</button>
              <button className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
