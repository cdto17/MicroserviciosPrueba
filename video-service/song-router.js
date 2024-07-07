const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const videos = {
    '1': path.join(__dirname, 'multimedia/GungsN.mp4'),
    '2': path.join(__dirname, 'multimedia/IWasMadeForLovinYou.mp4')
};

router.get('/video/:id/play', (req, res) => {
    const videoId = req.params.id;
    const videoPath = videos[videoId];

    if (!videoPath) {
        return res.status(404).send('Video not found');
    }

    fs.stat(videoPath, (err, stat) => {
        if (err) {
            return res.status(404).send('Video not found');
        }

        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(videoPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
                'Access-Control-Allow-Origin': '*'
            };

            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
                'Access-Control-Allow-Origin': '*'
            };
            res.writeHead(200, head);
            fs.createReadStream(videoPath).pipe(res);
        }
    });
});

module.exports = router;
