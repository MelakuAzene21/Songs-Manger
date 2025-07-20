const express = require('express');
const { genres } = require('../data/songs');

const router = express.Router();

// GET /api/genres - Get all available genres
router.get('/', (req, res) => {
    try {
        res.json({ genres });
    } catch (error) {
        console.error('Error fetching genres:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;