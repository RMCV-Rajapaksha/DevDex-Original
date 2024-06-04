import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import profile from '../assets/images/profile.jpg'; 

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/users/" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(res.data);
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/users/" + user._id, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchUserPosts();
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-20 flex md:flex-row flex-col-reverse md:items-start items-center">
        <div className="flex flex-col md:w-[70%] w-full mt-4 md:mt-8">
          <h1 className="mb-3 text-xl font-bold">Your Solutions:</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="max-w-sm m-10">
          <div className="px-4 pt-8 pb-10 bg-white border rounded-lg shadow-lg">
            <div className="relative mx-auto rounded-full w-36">
              <span className="absolute right-0 w-3 h-3 m-3 bg-green-500 rounded-full ring-2 ring-green-300 ring-offset-2"></span>
              <img
                className="w-full h-auto mx-auto rounded-full"
                src={profile}
                alt=""
              />
            </div>
            <h1 className="my-1 text-xl font-bold leading-8 text-center text-gray-900">{username}</h1>

            <p className="text-sm leading-6 text-center text-gray-500 hover:text-gray-600">
              Your description goes here
            </p>
            <ul className="px-3 py-2 mt-3 text-gray-600 bg-gray-100 divide-y rounded shadow-sm hover:text-gray-700 hover:shadow">
              <li className="flex items-center py-3 text-sm">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-200 rounded-full">
                    Writer
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3 text-sm">
                <span>Email</span>
                <span className="ml-auto">{email}</span>
              </li>
            </ul>
            <div className="flex flex-col items-start mt-4 space-y-4">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Your username"
                type="text"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Your email"
                type="email"
              />
              {/* <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                placeholder="Your password"
                type="password"
              /> */}
              <div className="flex items-center w-full mt-4 space-x-4">
                <button
                  onClick={handleUserUpdate}
                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                >
                  Save
                </button>
                <button
                  onClick={handleUserDelete}
                  className="flex items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                >
                  Delete
                </button>
              </div>
              {updated && (
                <h3 className="w-full mt-4 text-sm text-center text-green-500">
                  User updated successfully!
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
