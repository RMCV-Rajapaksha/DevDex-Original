import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL } from '../url';
import { UserContext } from "../context/UserContext";
import { motion } from "framer-motion";

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      console.log(res.data);

      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories || []); // Ensure categories is an array
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, { withCredentials: true });
      navigate("/posts/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

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

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 md:px-[200px] w-[90%] mx-auto mt-20 mb-10"
      >
        <h1 className="pt-5 mt-8 text-xl font-bold md:text-2xl">Update Solution</h1>
        <form className="flex flex-col w-full mt-4 space-y-4 md:space-y-8" onSubmit={handleUpdate}>
          <motion.input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Enter post title"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.input
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
            type="file"
            placeholder="Choose a file"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <motion.input
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Enter post category"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                onClick={addCategory}
                className="px-8 py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg cursor-pointer bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add
              </motion.div>
            </div>
            <div className="flex px-8 mt-3">
              {cats.length > 0 && cats.map((c, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-center px-2 py-1 mr-4 space-x-2 bg-gray-200 rounded-md"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <p>{c}</p>
                  <p
                    onClick={() => deleteCategory(i)}
                    className="p-1 text-sm text-white bg-black rounded-full cursor-pointer"
                  >
                    <ImCross />
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={15}
            cols={30}
            className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
            placeholder="Enter Post Description"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.button
            className="w-full px-8 py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-yellow-400 to-pink-600 hover:bg-indigo-700 focus:shadow-outline focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update
          </motion.button>
        </form>
      </motion.div>
      <Footer />
    </>
  );
};

export default EditPost;
