import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTags, FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { URL } from "../url";

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [filteredTags, setFilteredTags] = useState([]);
    const [search, setSearch] = useState("");
    const [loader, setLoader] = useState(true);

    const fetchTags = async () => {
        try {
            const res = await axios.get(`${URL}/api/tags`);
            setTags(res.data);
            setFilteredTags(res.data);
            setLoader(false);
        } catch (err) {
            console.error(err);
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchTags();
    }, []);

    useEffect(() => {
        if (search.trim()) {
            const filtered = tags.filter(tag =>
                tag.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredTags(filtered);
        } else {
            setFilteredTags(tags);
        }
    }, [search, tags]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <FaTags className="text-orange-500" /> Tags
                            </h1>
                            <p className="text-slate-400">
                                A tag is a keyword or label that categorizes your question with other, similar questions.
                            </p>
                        </div>

                        {/* Search */}
                        <div className="mb-8">
                            <div className="relative max-w-md">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Filter by tag name..."
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Tags Grid */}
                        {loader ? (
                            <div className="h-[40vh] flex justify-center items-center">
                                <Loader />
                            </div>
                        ) : filteredTags.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredTags.map((tag, index) => (
                                    <motion.div
                                        key={tag._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        <Link
                                            to={`/?tag=${tag.name}`}
                                            className="block bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-5 hover:border-orange-500/50 hover:bg-slate-800 transition-all group"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium group-hover:bg-blue-500/30 transition-colors">
                                                    {tag.name}
                                                </span>
                                                <span className="text-slate-500 text-sm">
                                                    {tag.questionCount || 0}
                                                </span>
                                            </div>

                                            {tag.description && (
                                                <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                                                    {tag.description}
                                                </p>
                                            )}

                                            <div className="text-xs text-slate-500">
                                                {tag.questionCount || 0} questions
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-slate-700">
                                <FaTags className="text-5xl text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400">
                                    {search ? `No tags found matching "${search}"` : 'No tags available yet'}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Tags;
