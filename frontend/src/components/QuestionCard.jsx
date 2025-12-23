import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCheck, FaEye, FaComment } from "react-icons/fa";
import TagBadge from "./TagBadge";

const QuestionCard = ({ question }) => {
    const {
        _id,
        title,
        desc,
        username,
        userId,
        categories = [],
        votes = 0,
        answerCount = 0,
        views = 0,
        acceptedAnswerId,
        createdAt
    } = question;

    const hasAcceptedAnswer = !!acceptedAnswerId;
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
    });

    return (
        <motion.div
            whileHover={{ y: -2 }}
            className="bg-slate-800/50 backdrop-blur rounded-xl border border-slate-700 hover:border-slate-600 transition-all overflow-hidden"
        >
            <div className="flex">
                {/* Stats Column */}
                <div className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-900/30 min-w-[90px] text-center">
                    {/* Votes */}
                    <div className={`${votes > 0 ? 'text-green-400' : votes < 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        <div className="text-xl font-bold">{votes}</div>
                        <div className="text-xs">votes</div>
                    </div>

                    {/* Answers */}
                    <div className={`px-2 py-1 rounded ${hasAcceptedAnswer
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : answerCount > 0
                                ? 'text-slate-300'
                                : 'text-slate-500'
                        }`}>
                        <div className="flex items-center justify-center gap-1">
                            {hasAcceptedAnswer && <FaCheck className="text-xs" />}
                            <span className="font-bold">{answerCount}</span>
                        </div>
                        <div className="text-xs">answers</div>
                    </div>

                    {/* Views */}
                    <div className="text-slate-500">
                        <div className="flex items-center justify-center gap-1">
                            <FaEye className="text-xs" />
                            <span className="font-bold text-sm">{views}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                    {/* Title */}
                    <Link
                        to={`/posts/post/${_id}`}
                        className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors line-clamp-2"
                    >
                        {title}
                    </Link>

                    {/* Description Preview */}
                    <p className="text-slate-400 text-sm mt-2 line-clamp-2">
                        {desc}
                    </p>

                    {/* Tags and Meta */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {categories.slice(0, 4).map((tag, index) => (
                                <TagBadge key={index} name={tag} size="xs" />
                            ))}
                            {categories.length > 4 && (
                                <span className="text-xs text-slate-500">+{categories.length - 4}</span>
                            )}
                        </div>

                        {/* Meta */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Link
                                to={`/profile/${userId}`}
                                className="text-orange-400 hover:text-orange-300"
                            >
                                {username}
                            </Link>
                            <span>asked {formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default QuestionCard;
