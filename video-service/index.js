const express = require('express');
const bodyParser = require('body-parser');
const songRouter = require('./song-router');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/api', songRouter);

app.listen(port, () => {
    console.log(`Microservice running at http://localhost:${port}`);
    console.log(`http://localhost:8084/api/video/1/play`);
});
