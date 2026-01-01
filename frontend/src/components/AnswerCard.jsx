import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { FaCheck, FaSave, FaTimes } from 'react-icons/fa';
import VoteButtons from "./VoteButtons";
import ConfirmModal from "./ConfirmModal";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const AnswerCard = ({
    answer,
    questionAuthorId,
    questionId,
    onAnswerUpdate,
    onAnswerDelete,
    onAccept
}) => {
    const { user } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editBody, setEditBody] = useState(answer.body);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isAnswerAuthor = user && user._id === answer.userId;
    const isQuestionAuthor = user && user._id === questionAuthorId;

    const handleVoteUpdate = (updatedAnswer) => {
        if (onAnswerUpdate) {
            onAnswerUpdate(updatedAnswer);
        }
    };

    const handleAccept = async () => {
        try {
            await axios.put(
                `${URL}/api/posts/${questionId}/accept/${answer._id}`,
                {},
                { withCredentials: true }
            );
            if (onAccept) {
                onAccept(answer._id);
            }
        } catch (err) {
            console.error('Failed to accept answer:', err);
        }
    };

    const handleEdit = async () => {
        if (!editBody.trim()) return;
        setLoading(true);
        try {
            const res = await axios.put(
                `${URL}/api/answers/${answer._id}`,
                { body: editBody },
                { withCredentials: true }
            );
            if (onAnswerUpdate) {
                onAnswerUpdate(res.data);
            }
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to edit answer:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${URL}/api/answers/${answer._id}`, { withCredentials: true });
            if (onAnswerDelete) {
                onAnswerDelete(answer._id);
            }
        } catch (err) {
            console.error('Failed to delete answer:', err);
        }
    };

    return (
        <div className={`flex ${answer.isAccepted ? 'bg-green-500/5' : ''}`}>
            {/* Vote Section */}
            <div className="p-4 flex flex-col items-center">
                <VoteButtons
                    targetId={answer._id}
                    targetType="answer"
                    votes={answer.votes}
                    upvoters={answer.upvoters || []}
                    downvoters={answer.downvoters || []}
                    onVoteUpdate={handleVoteUpdate}
                />

                {/* Accept Button / Indicator */}
                {answer.isAccepted ? (
                    <div className="mt-3 text-green-400" title="Accepted Answer">
                        <FaCheck className="text-2xl" />
                    </div>
                ) : isQuestionAuthor && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={handleAccept}
                        className="mt-3 p-2 text-slate-500 hover:text-green-400 rounded-lg hover:bg-green-500/10 transition-all"
                        title="Accept this answer"
                    >
                        <FaCheck className="text-xl" />
                    </motion.button>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 p-4 pl-0">
                {isEditing ? (
                    <div className="space-y-3">
                        <textarea
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            rows={6}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleEdit}
                                disabled={loading}
                                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 flex items-center gap-2 disabled:opacity-50"
                            >
                                <FaSave /> Save
                            </button>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditBody(answer.body);
                                }}
                                className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 flex items-center gap-2"
                            >
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Answer Body */}
                        <div className="prose prose-invert max-w-none">
                            <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">
                                {answer.body}
                            </p>
                        </div>

                        {/* Meta & Actions */}
                        <div className="flex justify-between items-start mt-4 pt-4 border-t border-slate-700">
                            {/* Actions */}
                            <div className="flex items-center gap-4 text-sm text-slate-400">
                                {isAnswerAuthor && (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(true)}
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

                                        <ConfirmModal
                                            isOpen={showDeleteModal}
                                            onClose={() => setShowDeleteModal(false)}
                                            onConfirm={handleDelete}
                                            title="Delete Answer"
                                            message="Are you sure you want to delete this answer? This action cannot be undone."
                                            confirmText="Delete Answer"
                                            variant="danger"
                                        />
                                    </>
                                )}
                            </div>

                            {/* Author Info */}
                            <div className="bg-slate-900/50 p-3 rounded-lg">
                                <div className="text-xs text-slate-500">
                                    answered {new Date(answer.createdAt).toLocaleDateString()}
                                </div>
                                <Link
                                    to={`/profile/${answer.userId}`}
                                    className="font-medium text-orange-400 hover:text-orange-300"
                                >
                                    @{answer.username}
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AnswerCard;
