const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const Post = require('../models/Post');
const verifyToken = require('../verifyToken');

// Get all tags
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find().sort({ questionCount: -1 });
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get popular tags (top 20)
router.get('/popular', async (req, res) => {
    try {
        const tags = await Tag.find().sort({ questionCount: -1 }).limit(20);
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Search tags
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q || '';
        const tags = await Tag.find({
            name: { $regex: query, $options: 'i' }
        }).limit(10);
        res.status(200).json(tags);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get tag by name
router.get('/:name', async (req, res) => {
    try {
        const tag = await Tag.findOne({ name: req.params.name.toLowerCase() });
        if (!tag) {
            return res.status(404).json("Tag not found");
        }
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create or update tag (called when creating questions)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const tagName = name.toLowerCase().trim();

        let tag = await Tag.findOne({ name: tagName });

        if (tag) {
            // Increment count if tag exists
            tag = await Tag.findOneAndUpdate(
                { name: tagName },
                { $inc: { questionCount: 1 } },
                { new: true }
            );
        } else {
            // Create new tag
            tag = new Tag({
                name: tagName,
                description: description || '',
                questionCount: 1
            });
            await tag.save();
        }

        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Decrement tag count (called when deleting questions)
router.put('/decrement/:name', async (req, res) => {
    try {
        const tag = await Tag.findOneAndUpdate(
            { name: req.params.name.toLowerCase() },
            { $inc: { questionCount: -1 } },
            { new: true }
        );
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
