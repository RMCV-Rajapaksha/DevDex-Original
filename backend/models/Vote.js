const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    targetId: {
        type: String,
        required: true,
    },
    targetType: {
        type: String,
        enum: ['question', 'answer'],
        required: true,
    },
    voteType: {
        type: Number,
        enum: [1, -1],
        required: true,
    }
}, { timestamps: true });

// Compound index to ensure one vote per user per target
VoteSchema.index({ userId: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Vote", VoteSchema);
