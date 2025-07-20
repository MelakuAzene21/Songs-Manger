const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const { songs } = require('../data/songs');

const router = express.Router();

// In-memory storage (in production, use a database)
let songsData = [...songs];

// Validation middleware
const validateSong = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('artist').trim().notEmpty().withMessage('Artist is required'),
    body('album').trim().notEmpty().withMessage('Album is required'),
    body('year').isInt({ min: 1000, max: new Date().getFullYear() + 1 }).withMessage('Year must be a valid year'),
    body('duration').isInt({ min: 1, max: 3600 }).withMessage('Duration must be between 1 and 3600 seconds'),
    body('genre').trim().notEmpty().withMessage('Genre is required'),
];

const validatePagination = [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    query('sortBy').optional().isIn(['title', 'artist', 'album', 'year', 'genre', 'duration']).withMessage('Invalid sort field'),
    query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc'),
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
        });
    }
    next();
};

// GET /api/songs - Get paginated songs with filtering and sorting
router.get('/', validatePagination, handleValidationErrors, (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            genre = '',
            sortBy = 'title',
            sortOrder = 'asc'
        } = req.query;

        let filteredSongs = [...songsData];

        // Apply search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filteredSongs = filteredSongs.filter(song =>
                song.title.toLowerCase().includes(searchLower) ||
                song.artist.toLowerCase().includes(searchLower) ||
                song.album.toLowerCase().includes(searchLower)
            );
        }

        // Apply genre filter
        if (genre) {
            filteredSongs = filteredSongs.filter(song => song.genre === genre);
        }

        // Apply sorting
        filteredSongs.sort((a, b) => {
            const aVal = a[sortBy];
            const bVal = b[sortBy];

            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortOrder === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        });

        // Apply pagination
        const total = filteredSongs.length;
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

        res.json({
            data: paginatedSongs,
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / parseInt(limit)),
        });
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/songs/:id - Get single song
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const song = songsData.find(s => s.id === id);

        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.json(song);
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/songs - Create new song
router.post('/', validateSong, handleValidationErrors, (req, res) => {
    try {
        const { title, artist, album, year, duration, genre } = req.body;

        const newSong = {
            id: uuidv4(),
            title: title.trim(),
            artist: artist.trim(),
            album: album.trim(),
            year: parseInt(year),
            duration: parseInt(duration),
            genre: genre.trim(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        songsData.unshift(newSong);

        res.status(201).json(newSong);
    } catch (error) {
        console.error('Error creating song:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /api/songs/:id - Update song
router.put('/:id', validateSong, handleValidationErrors, (req, res) => {
    try {
        const { id } = req.params;
        const { title, artist, album, year, duration, genre } = req.body;

        const songIndex = songsData.findIndex(s => s.id === id);

        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found' });
        }

        const updatedSong = {
            ...songsData[songIndex],
            title: title.trim(),
            artist: artist.trim(),
            album: album.trim(),
            year: parseInt(year),
            duration: parseInt(duration),
            genre: genre.trim(),
            updatedAt: new Date().toISOString(),
        };

        songsData[songIndex] = updatedSong;

        res.json(updatedSong);
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE /api/songs/:id - Delete song
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const songIndex = songsData.findIndex(s => s.id === id);

        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found' });
        }

        songsData.splice(songIndex, 1);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;