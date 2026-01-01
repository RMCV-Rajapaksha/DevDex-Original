import { useParams, useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { FaCheck, FaEye, FaComment, FaReply } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import VoteButtons from "../components/VoteButtons";
import AnswerCard from "../components/AnswerCard";
import TagBadge from "../components/TagBadge";
import Comments from "../components/Comments";
import TextToSpeech from "../components/TextToSpeech";
import ConfirmModal from "../components/ConfirmModal";
import { UserContext } from "../context/UserContext";
import { URL, IF } from '../url';

const PostDetails = () => {
  const { id: postId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const [post, setPost] = useState({});
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(true);

  // Form states
  const [comment, setComment] = useState("");
  const [answerBody, setAnswerBody] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);

  // Delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);

      // Increment view count
      await axios.put(`${URL}/api/posts/${postId}/view`);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAnswers = async () => {
    try {
      const res = await axios.get(`${URL}/api/answers/question/${postId}`);
      setAnswers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoader(true);
      await Promise.all([fetchPost(), fetchAnswers(), fetchComments()]);
      setLoader(false);
    };
    loadData();
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handleVoteUpdate = (updatedPost) => {
    setPost(updatedPost);
  };

  const handleAnswerUpdate = (updatedAnswer) => {
    setAnswers(answers.map(a => a._id === updatedAnswer._id ? updatedAnswer : a));
  };

  const handleAnswerDelete = (answerId) => {
    setAnswers(answers.filter(a => a._id !== answerId));
    setPost({ ...post, answerCount: post.answerCount - 1 });
  };

  const handleAccept = (answerId) => {
    setPost({ ...post, acceptedAnswerId: answerId });
    setAnswers(answers.map(a => ({
      ...a,
      isAccepted: a._id === answerId
    })));
  };

  const postComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try {
      await axios.post(
        `${URL}/api/comments/create`,
        { comment, author: user.username, postId, userId: user._id },
        { withCredentials: true }
      );
      setComment("");
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  const postAnswer = async (e) => {
    e.preventDefault();
    if (!answerBody.trim()) return;

    setSubmittingAnswer(true);
    try {
      const res = await axios.post(
        `${URL}/api/answers/create`,
        {
          body: answerBody,
          questionId: postId,
          userId: user._id,
          username: user.username
        },
        { withCredentials: true }
      );
      setAnswers([...answers, res.data]);
      setPost({ ...post, answerCount: (post.answerCount || 0) + 1 });
      setAnswerBody("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  const isQuestionAuthor = user && user._id === post?.userId;

  if (loader) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4">

          {/* Question Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Asked {new Date(post.createdAt).toLocaleDateString()}</span>
              <span>Modified {new Date(post.updatedAt).toLocaleDateString()}</span>
              <span className="flex items-center gap-1">
                <FaEye /> {post.views || 0} views
              </span>
            </div>
          </motion.div>

          {/* Question Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 overflow-hidden"
          >
            <div className="flex">
              {/* Vote Section */}
              <div className="p-4 bg-slate-900/50 border-r border-slate-700 flex flex-col items-center">
                <VoteButtons
                  targetId={post._id}
                  targetType="question"
                  votes={post.votes}
                  upvoters={post.upvoters || []}
                  downvoters={post.downvoters || []}
                  onVoteUpdate={handleVoteUpdate}
                />

                {post.acceptedAnswerId && (
                  <div className="mt-4 text-green-400" title="Has accepted answer">
                    <FaCheck className="text-2xl" />
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Image */}
                {post.photo && (
                  <img
                    src={IF + post.photo}
                    className="w-full max-h-96 object-contain rounded-xl mb-6 bg-slate-900/50"
                    alt={post.title}
                  />
                )}

                {/* Text to Speech */}
                <div className="mb-4">
                  <TextToSpeech text={post.desc} />
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none mb-6">
                  <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{post.desc}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.categories?.map((tag, i) => (
                    <TagBadge key={i} name={tag} />
                  ))}
                </div>

                {/* Meta & Actions */}
                <div className="flex justify-between items-start pt-4 border-t border-slate-700">
                  {/* Action Links */}
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    {isQuestionAuthor && (
                      <>
                        <button
                          onClick={() => navigate(`/edit/${postId}`)}
                          className="flex items-center gap-1 hover:text-orange-400 transition-colors"
                        >
                          <BiEdit /> Edit
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="flex items-center gap-1 hover:text-red-400 transition-colors"
                        >
                          <MdDelete /> Delete
                        </button>
                      </>
                    )}
                  </div>

                  {/* Author Card */}
                  <div className="bg-slate-900/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-500">
                      asked {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <Link
                      to={`/profile/${post.userId}`}
                      className="font-medium text-orange-400 hover:text-orange-300"
                    >
                      @{post.username}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-slate-700 p-6 bg-slate-900/30">
              <h4 className="text-sm font-semibold text-slate-400 mb-3 flex items-center gap-2">
                <FaComment /> {comments.length} Comments
              </h4>

              {comments.map((c) => (
                <Comments key={c._id} c={c} post={post} />
              ))}

              {user && (
                <div className="flex gap-2 mt-4">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 text-sm bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={postComment}
                    className="px-4 py-2 text-sm bg-slate-700 text-white rounded-lg hover:bg-slate-600"
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Answers Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FaReply className="text-orange-500" />
              {answers.length} {answers.length === 1 ? 'Answer' : 'Answers'}
            </h2>

            <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 divide-y divide-slate-700">
              {answers.length > 0 ? (
                answers.map((answer) => (
                  <AnswerCard
                    key={answer._id}
                    answer={answer}
                    questionAuthorId={post.userId}
                    questionId={postId}
                    onAnswerUpdate={handleAnswerUpdate}
                    onAnswerDelete={handleAnswerDelete}
                    onAccept={handleAccept}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  No answers yet. Be the first to help!
                </div>
              )}
            </div>
          </motion.div>

          {/* Post Answer Form */}
          {user ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6"
            >
              <h2 className="text-xl font-bold text-white mb-4">Your Answer</h2>

              <textarea
                value={answerBody}
                onChange={(e) => setAnswerBody(e.target.value)}
                placeholder="Write your answer here..."
                rows={8}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none mb-4"
              />

              <button
                onClick={postAnswer}
                disabled={submittingAnswer || !answerBody.trim()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submittingAnswer ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaReply /> Post Your Answer
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6 text-center"
            >
              <p className="text-slate-400 mb-3">
                You need to be logged in to post an answer.
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600"
              >
                Log In
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePost}
        title="Delete Question"
        message="Are you sure you want to delete this question? All answers and comments will also be deleted."
        confirmText="Delete Question"
        variant="danger"
      />

      <Footer />
    </div>
  );
};

export default PostDetails;
