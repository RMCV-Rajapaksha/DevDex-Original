const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Comment = require('../models/Comments');
const Answer = require('../models/Answer');
const Tag = require('../models/Tag');
const verifyToken = require('../verifyToken');

// Create post/question
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();

        // Update tag counts if categories exist
        if (req.body.categories && req.body.categories.length > 0) {
            for (const tagName of req.body.categories) {
                await Tag.findOneAndUpdate(
                    { name: tagName.toLowerCase().trim() },
                    {
                        $inc: { questionCount: 1 },
                        $setOnInsert: { name: tagName.toLowerCase().trim(), description: '' }
                    },
                    { upsert: true, new: true }
                );
            }
        }

        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update post/question
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete post/question
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json("Post not found");
        }

        // Decrement tag counts
        if (post.categories && post.categories.length > 0) {
            for (const tagName of post.categories) {
                await Tag.findOneAndUpdate(
                    { name: tagName.toLowerCase().trim() },
                    { $inc: { questionCount: -1 } }
                );
            }
        }

        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({ postId: req.params.id });
        await Answer.deleteMany({ questionId: req.params.id });

        res.status(200).json("Post has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get post/question details
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Increment view count
router.put('/:id/view', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { views: 1 } },
            { new: true }
        );
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Vote on post/question
router.put('/:id/vote', verifyToken, async (req, res) => {
    try {
        const { voteType, userId } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        const hasUpvoted = post.upvoters.includes(userId);
        const hasDownvoted = post.downvoters.includes(userId);

        let update = {};

        if (voteType === 1) {
            if (hasUpvoted) {
                update = {
                    $pull: { upvoters: userId },
                    $inc: { votes: -1 }
                };
            } else if (hasDownvoted) {
                update = {
                    $pull: { downvoters: userId },
                    $push: { upvoters: userId },
                    $inc: { votes: 2 }
                };
            } else {
                update = {
                    $push: { upvoters: userId },
                    $inc: { votes: 1 }
                };
            }
        } else if (voteType === -1) {
            if (hasDownvoted) {
                update = {
                    $pull: { downvoters: userId },
                    $inc: { votes: 1 }
                };
            } else if (hasUpvoted) {
                update = {
                    $pull: { upvoters: userId },
                    $push: { downvoters: userId },
                    $inc: { votes: -2 }
                };
            } else {
                update = {
                    $push: { downvoters: userId },
                    $inc: { votes: -1 }
                };
            }
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Accept an answer
router.put('/:id/accept/:answerId', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        // Unaccept previous answer if any
        if (post.acceptedAnswerId) {
            await Answer.findByIdAndUpdate(post.acceptedAnswerId, { isAccepted: false });
        }

        // Accept new answer
        await Answer.findByIdAndUpdate(req.params.answerId, { isAccepted: true });

        // Update post with accepted answer
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { acceptedAnswerId: req.params.answerId } },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Unaccept an answer
router.put('/:id/unaccept', verifyToken, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json("Post not found");
        }

        if (post.acceptedAnswerId) {
            await Answer.findByIdAndUpdate(post.acceptedAnswerId, { isAccepted: false });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: { acceptedAnswerId: null } },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all posts with sorting and filtering
router.get('/', async (req, res) => {
    try {
        const { search, sort, tag } = req.query;

        let filter = {};

        // Search filter
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { desc: { $regex: search, $options: 'i' } }
            ];
        }

        // Tag filter
        if (tag) {
            filter.categories = { $in: [tag.toLowerCase()] };
        }

        // Sort options
        let sortOption = { createdAt: -1 }; // default: newest
        if (sort === 'votes') {
            sortOption = { votes: -1, createdAt: -1 };
        } else if (sort === 'unanswered') {
            filter.answerCount = 0;
            sortOption = { createdAt: -1 };
        } else if (sort === 'active') {
            sortOption = { updatedAt: -1 };
        }

        const posts = await Post.find(filter).sort(sortOption);
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get posts by tag
router.get('/tag/:tagName', async (req, res) => {
    try {
        const posts = await Post.find({
            categories: { $in: [req.params.tagName.toLowerCase()] }
        }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;