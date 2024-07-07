const fs = require('fs');
const path = require('path');
const songsFilePath = path.join(__dirname, 'songs.json');

const readSongs = () => {
    const data = fs.readFileSync(songsFilePath);
    return JSON.parse(data);
};

const writeSongs = (songs) => {
    fs.writeFileSync(songsFilePath, JSON.stringify(songs, null, 2));
};

module.exports = {
    readSongs,
    writeSongs
};
