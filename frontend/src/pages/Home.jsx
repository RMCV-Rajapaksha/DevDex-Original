import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import HomePosts from "../components/HomePosts";
import Footer from "../components/Footer";
import Loader from '../components/Loader';
import { UserContext } from "../context/UserContext";
import { URL } from '../url';
import Hero from "../components/Hero";


const Home = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/posts/${search}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="px-8 md:px-[200px] min-h-[80vh] mt-20">
        {loader ? (
          <div className="h-[40vh] flex justify-center items-center"><Loader/></div>
        ) : !noResults ? (
          posts.map((post) => (
            <Link key={post._id} to={user ? `/posts/post/${post._id}` : "/login"}>
              <HomePosts post={post} />
            </Link>
          ))
        ) : (
          <h3 className="mt-16 font-bold text-center">No posts available</h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;