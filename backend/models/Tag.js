const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
    },
    questionCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model("Tag", TagSchema);
