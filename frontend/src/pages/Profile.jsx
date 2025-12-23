import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';
import { FaQuestion, FaCheckCircle, FaTrophy, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestionCard from "../components/QuestionCard";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const Profile = () => {
  const { id: profileId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [profileUser, setProfileUser] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reputation, setReputation] = useState(0);
  const [stats, setStats] = useState({ questions: 0, answers: 0, accepted: 0 });

  // Edit form
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const isOwnProfile = user && user._id === profileId;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${profileId}`);
      setProfileUser(res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${profileId}`);
      setQuestions(res.data);

      const questionRep = res.data.reduce((sum, q) => sum + (q.votes || 0) * 10, 0);
      setReputation(questionRep);
      setStats(prev => ({ ...prev, questions: res.data.length }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setReputation(0);
      await Promise.all([fetchProfile(), fetchQuestions()]);
      setLoading(false);
    };
    loadData();
  }, [profileId]);

  const handleUserUpdate = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(
        `${URL}/api/users/${user._id}`,
        { username, email },
        { withCredentials: true }
      );
      setUpdated(true);
      setIsEditing(false);
      setTimeout(() => setUpdated(false), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleUserDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) return;
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="h-[80vh] flex justify-center items-center">
          <Loader />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Navbar />
        <div className="h-[80vh] flex justify-center items-center">
          <p className="text-slate-400">User not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6 mb-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-white text-5xl font-bold">
                    {profileUser.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">
                  {profileUser.username}
                </h1>
                <p className="text-slate-400 mt-1">{profileUser.email}</p>
                <p className="text-sm text-slate-500 mt-2">
                  Member since {new Date(profileUser.createdAt).toLocaleDateString()}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-bold text-2xl text-white">{reputation}</span>
                    <span className="text-slate-400">reputation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaQuestion className="text-blue-400" />
                    <span className="font-bold text-white">{stats.questions}</span>
                    <span className="text-slate-400">questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    <span className="font-bold text-white">{stats.accepted}</span>
                    <span className="text-slate-400">accepted</span>
                  </div>
                </div>

                {updated && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 text-green-400 text-sm"
                  >
                    Profile updated successfully!
                  </motion.p>
                )}
              </div>

              {/* Edit Button */}
              {isOwnProfile && !isEditing && (
                <div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              )}
            </div>

            {/* Edit Form */}
            {isOwnProfile && isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 pt-6 border-t border-slate-700"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Username
                    </label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleUserUpdate}
                    disabled={updateLoading}
                    className="px-5 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 flex items-center gap-2 disabled:opacity-50"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 flex items-center gap-2"
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    onClick={handleUserDelete}
                    className="px-5 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 flex items-center gap-2 ml-auto"
                  >
                    <FaTrash /> Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Questions Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaQuestion className="text-orange-500" />
              Questions ({stats.questions})
            </h2>

            {questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((q, index) => (
                  <motion.div
                    key={q._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <QuestionCard question={q} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-8 text-center">
                <FaQuestion className="text-5xl text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 mb-4">No questions yet</p>
                {isOwnProfile && (
                  <Link
                    to="/ask"
                    className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600"
                  >
                    Ask your first question
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
