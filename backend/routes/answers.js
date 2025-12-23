const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Post = require('../models/Post');
const verifyToken = require('../verifyToken');

// Create answer
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newAnswer = new Answer(req.body);
        const savedAnswer = await newAnswer.save();

        // Increment answer count on the question
        await Post.findByIdAndUpdate(req.body.questionId, {
            $inc: { answerCount: 1 }
        });

        res.status(200).json(savedAnswer);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get answers for a question
router.get('/question/:questionId', async (req, res) => {
    try {
        const answers = await Answer.find({ questionId: req.params.questionId }).sort({ isAccepted: -1, votes: -1, createdAt: -1 });
        res.status(200).json(answers);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update answer
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(
            req.params.id,
            { $set: { body: req.body.body } },
            { new: true }
        );
        res.status(200).json(updatedAnswer);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete answer
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer) {
            return res.status(404).json("Answer not found");
        }

        await Answer.findByIdAndDelete(req.params.id);

        // Decrement answer count on the question
        await Post.findByIdAndUpdate(answer.questionId, {
            $inc: { answerCount: -1 }
        });

        // If this was the accepted answer, remove acceptance
        await Post.findOneAndUpdate(
            { acceptedAnswerId: req.params.id },
            { $set: { acceptedAnswerId: null } }
        );

        res.status(200).json("Answer has been deleted!");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Vote on answer
router.put('/:id/vote', verifyToken, async (req, res) => {
    try {
        const { voteType, userId } = req.body; // voteType: 1 (upvote) or -1 (downvote)
        const answer = await Answer.findById(req.params.id);

        if (!answer) {
            return res.status(404).json("Answer not found");
        }

        const hasUpvoted = answer.upvoters.includes(userId);
        const hasDownvoted = answer.downvoters.includes(userId);

        let update = {};

        if (voteType === 1) {
            if (hasUpvoted) {
                // Remove upvote
                update = {
                    $pull: { upvoters: userId },
                    $inc: { votes: -1 }
                };
            } else if (hasDownvoted) {
                // Change from downvote to upvote
                update = {
                    $pull: { downvoters: userId },
                    $push: { upvoters: userId },
                    $inc: { votes: 2 }
                };
            } else {
                // New upvote
                update = {
                    $push: { upvoters: userId },
                    $inc: { votes: 1 }
                };
            }
        } else if (voteType === -1) {
            if (hasDownvoted) {
                // Remove downvote
                update = {
                    $pull: { downvoters: userId },
                    $inc: { votes: 1 }
                };
            } else if (hasUpvoted) {
                // Change from upvote to downvote
                update = {
                    $pull: { upvoters: userId },
                    $push: { downvoters: userId },
                    $inc: { votes: -2 }
                };
            } else {
                // New downvote
                update = {
                    $push: { downvoters: userId },
                    $inc: { votes: -1 }
                };
            }
        }

        const updatedAnswer = await Answer.findByIdAndUpdate(req.params.id, update, { new: true });
        res.status(200).json(updatedAnswer);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
