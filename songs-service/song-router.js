const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const songs = {
    '1': path.join(__dirname, './multimedia/songs1.mp3'),
    '2': path.join(__dirname, './multimedia/songs2.mp3')
};

router.get('/song/:id/play', (req, res) => {
    const songId = req.params.id;
    const songPath = songs[songId];

    if (!songPath) {
        return res.status(404).send('Song not found');
    }

    const stat = fs.statSync(songPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(songPath, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/mpeg',
            'Access-Control-Allow-Origin': '*'
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/mpeg',
            'Access-Control-Allow-Origin': '*'
        };
        res.writeHead(200, head);
        fs.createReadStream(songPath).pipe(res);
    }
});

module.exports = router;
