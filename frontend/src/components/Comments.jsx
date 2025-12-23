import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';

const Comments = ({ c, post }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`${URL}/api/comments/${id}`, { withCredentials: true });
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const canDelete = user?._id === c.userId || user?._id === post?.userId;

  return (
    <div className="py-2 px-3 my-1 text-sm border-b border-slate-700 last:border-0">
      <div className="flex items-start gap-2">
        <p className="text-slate-300 flex-1">{c.comment}</p>
        <span className="text-slate-500"> – </span>
        <Link
          to={`/profile/${c.userId}`}
          className="text-orange-400 hover:text-orange-300 whitespace-nowrap"
        >
          @{c.author}
        </Link>
        <span className="text-slate-500 text-xs whitespace-nowrap">
          {new Date(c.updatedAt).toLocaleDateString()}
        </span>
        {canDelete && (
          <button
            onClick={() => deleteComment(c._id)}
            className="text-slate-500 hover:text-red-400 transition-colors ml-1"
            title="Delete comment"
          >
            <MdDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default Comments;
