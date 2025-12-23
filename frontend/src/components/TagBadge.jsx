import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TagBadge = ({ name, count, size = "sm", showCount = false }) => {
    const sizeClasses = {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2.5 py-1 text-sm",
        md: "px-3 py-1.5 text-sm",
    };

    return (
        <motion.span whileHover={{ scale: 1.05 }}>
            <Link
                to={`/?tag=${name}`}
                className={`inline-flex items-center gap-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors ${sizeClasses[size]}`}
            >
                {name}
                {showCount && count !== undefined && (
                    <span className="text-blue-300/60">× {count}</span>
                )}
            </Link>
        </motion.span>
    );
};

export default TagBadge;
