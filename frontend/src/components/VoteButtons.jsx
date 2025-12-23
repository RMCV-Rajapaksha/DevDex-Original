import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";

const VoteButtons = ({
    targetId,
    targetType, // 'question' or 'answer'
    votes = 0,
    upvoters = [],
    downvoters = [],
    onVoteUpdate
}) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const hasUpvoted = user && upvoters.includes(user._id);
    const hasDownvoted = user && downvoters.includes(user._id);

    const handleVote = async (voteType) => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const endpoint = targetType === 'question'
                ? `${URL}/api/posts/${targetId}/vote`
                : `${URL}/api/answers/${targetId}/vote`;

            const res = await axios.put(
                endpoint,
                { voteType, userId: user._id },
                { withCredentials: true }
            );

            if (onVoteUpdate) {
                onVoteUpdate(res.data);
            }
        } catch (err) {
            console.error('Vote failed:', err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-1">
            {/* Upvote */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(1)}
                className={`p-2 rounded-lg transition-all ${hasUpvoted
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'text-slate-500 hover:bg-slate-700 hover:text-slate-300'
                    }`}
                title="Upvote"
            >
                <FaCaretUp className="text-2xl" />
            </motion.button>

            {/* Vote Count */}
            <span className={`text-xl font-bold ${votes > 0 ? 'text-green-400' : votes < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                {votes}
            </span>

            {/* Downvote */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleVote(-1)}
                className={`p-2 rounded-lg transition-all ${hasDownvoted
                        ? 'bg-red-500/20 text-red-400'
                        : 'text-slate-500 hover:bg-slate-700 hover:text-slate-300'
                    }`}
                title="Downvote"
            >
                <FaCaretDown className="text-2xl" />
            </motion.button>
        </div>
    );
};

export default VoteButtons;
