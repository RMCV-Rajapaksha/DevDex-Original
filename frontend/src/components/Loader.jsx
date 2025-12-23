import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-slate-700 border-t-orange-500 rounded-full"
      />
      <span className="text-slate-400 text-sm">Loading...</span>
    </div>
  );
};

export default Loader;