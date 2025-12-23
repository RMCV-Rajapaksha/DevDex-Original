const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    questionId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
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
    isAccepted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model("Answer", AnswerSchema);
