import { motion } from 'framer-motion';
import { IF } from '../url';

const HomePosts = ({ post }) => {
  return (
    <motion.div 
      className="flex w-full p-4 mt-4 space-x-4 rounded-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}
    >
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + post.photo} alt={post.title} className="object-cover w-full h-full rounded-3xl"/>
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%]">
        <h1 className="mb-1 text-xl font-bold md:text-2xl">
          {post.title}
        </h1>
        <div className="flex items-center justify-between mb-2 space-x-4 text-sm font-semibold text-gray-500 md:mb-4">
          <p>@{post.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
            <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
          </div>
        </div>
        <p className="text-sm font-medium md:text-base">
          {post.desc.substring(0, 200) + "...Read more"}
        </p>
      </div>
    </motion.div>
  );
}

export default HomePosts;
