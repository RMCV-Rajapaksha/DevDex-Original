import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlus, FaFire, FaTags } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from '../components/Loader';
import QuestionCard from "../components/QuestionCard";
import QuestionFilters from "../components/QuestionFilters";
import TagBadge from "../components/TagBadge";
import { UserContext } from "../context/UserContext";
import { URL } from '../url';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoader(true);
    try {
      const search = searchParams.get('search') || '';
      const sort = searchParams.get('sort') || 'newest';
      const tag = searchParams.get('tag') || '';

      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (sort) params.set('sort', sort);
      if (tag) params.set('tag', tag);

      const res = await axios.get(`${URL}/api/posts?${params.toString()}`);
      setPosts(res.data);
      setNoResults(res.data.length === 0);
      setLoader(false);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setLoader(false);
    }
  };

  const fetchPopularTags = async () => {
    try {
      const res = await axios.get(`${URL}/api/tags/popular`);
      setPopularTags(res.data.slice(0, 10));
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchPopularTags();
  }, [searchParams]);

  const currentTag = searchParams.get('tag');
  const currentSearch = searchParams.get('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left Sidebar - Tags */}
            <aside className="lg:w-56 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 p-4"
              >
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <FaFire className="text-orange-500" /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <TagBadge
                      key={tag._id}
                      name={tag.name}
                      count={tag.questionCount}
                      size="sm"
                      showCount
                    />
                  ))}
                  {popularTags.length === 0 && (
                    <p className="text-slate-500 text-sm">No tags yet</p>
                  )}
                </div>
                <Link
                  to="/tags"
                  className="block mt-4 text-sm text-orange-400 hover:text-orange-300"
                >
                  View all tags →
                </Link>
              </motion.div>
            </aside>

            {/* Main Questions List */}
            <main className="flex-1">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
              >
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    {currentTag
                      ? `Questions tagged [${currentTag}]`
                      : currentSearch
                        ? `Search: "${currentSearch}"`
                        : 'All Questions'}
                  </h1>
                  <p className="text-slate-400 mt-1">{posts.length} questions</p>
                </div>

                <Link
                  to="/ask"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-orange-500/25"
                >
                  <FaPlus /> Ask Question
                </Link>
              </motion.div>

              {/* Filters */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <QuestionFilters />
              </motion.div>

              {/* Questions List */}
              {loader ? (
                <div className="h-[40vh] flex justify-center items-center">
                  <Loader />
                </div>
              ) : !noResults ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  {posts.map((post, index) => (
                    <motion.div
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <QuestionCard question={post} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">No questions found</h3>
                  <p className="text-slate-400 mb-4">Be the first to ask a question!</p>
                  <Link
                    to="/ask"
                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl hover:from-orange-600 hover:to-pink-600"
                  >
                    <FaPlus /> Ask Question
                  </Link>
                </motion.div>
              )}
            </main>

            {/* Right Sidebar */}
            <aside className="lg:w-72 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl border border-orange-500/30 p-5"
              >
                <h3 className="font-semibold text-white mb-2 text-lg">🎉 Welcome to DevDex!</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ask questions, share knowledge, and help fellow developers solve problems.
                </p>
              </motion.div>

              {!user && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 p-5"
                >
                  <h3 className="font-semibold text-white mb-2">Join the community</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Sign up to ask questions, vote on answers, and earn reputation.
                  </p>
                  <Link
                    to="/register"
                    className="block w-full text-center py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full text-center py-2 mt-2 text-slate-400 hover:text-white transition-colors"
                  >
                    Already have an account? Log in
                  </Link>
                </motion.div>
              )}
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;