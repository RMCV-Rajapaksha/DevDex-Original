import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const QuestionFilters = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const currentSort = searchParams.get('sort') || 'newest';

    const filters = [
        { id: 'newest', label: 'Newest' },
        { id: 'active', label: 'Active' },
        { id: 'unanswered', label: 'Unanswered' },
        { id: 'votes', label: 'Top Voted' },
    ];

    const handleFilterChange = (sortId) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort', sortId);
        navigate(`/?${newParams.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
                <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleFilterChange(filter.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentSort === filter.id
                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700'
                        }`}
                >
                    {filter.label}
                </motion.button>
            ))}
        </div>
    );
};

export default QuestionFilters;
