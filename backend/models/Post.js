const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        default: [],
    },
    // Q&A Features
    votes: {
        type: Number,
        default: 0,
    },
    upvoters: {
        type: [String],
        default: [],
    },
    downvoters: {
        type: [String],
        default: [],
    },
    acceptedAnswerId: {
        type: String,
        default: null,
    },
    views: {
        type: Number,
        default: 0,
    },
    answerCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);

