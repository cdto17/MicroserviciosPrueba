const express = require('express');
const { readSongs } = require('./data/songs');  
const router = express.Router();

// Ruta para obtener todas las canciones
router.get('/songs', (req, res) => {
    try {
        const songs = readSongs();
        res.json(songs);
    } catch (error) {
        res.status(500).send('Error reading songs data');
    }
});

module.exports = router;
