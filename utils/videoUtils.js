// video utilities that help manage video operations, logic here

const ffmpeg = require('fluent-ffmpeg'); // for handling mulitmedia operations
const path = require('path');
const fs = require('fs');

// upload video
const uploadVideo = async (filePath) => {

    try {
        const metadata = await ffmpeg.ffprobe(filePath);
        return metadata.format.duration;
    } catch (err) {
        throw err;
    }
};



