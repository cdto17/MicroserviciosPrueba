const express = require('express');
const bodyParser = require('body-parser');
const songsRouter = require('./songs-router');

const app = express();
app.use(bodyParser.json());

app.use('/api', songsRouter);

app.listen(3002, () => {
    console.log('Songs Listing Service running on port 3002');
    console.log('http://localhost:8082/api/songs/');
});