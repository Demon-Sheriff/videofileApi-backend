// video utilities that help manage video operations, logic here

const ffmpeg = require('fluent-ffmpeg'); // for handling mulitmedia operations
const path = require('path');
const fs = require('fs');
const { promisify } = require('util'); // import promisify


// upload video utility
const uploadVideoUtil = async (filePath) => {
    const ffprobe = promisify(ffmpeg.ffprobe); // Promisify the ffprobe function
    try {
        const metadata = await ffprobe(filePath);
        return metadata.format.duration; // Return the duration
    } catch (err) {
        throw err; // Throw the error to be handled by the caller
    }
};

// trim video utility
const trimVideoUtil = async (filePath, start, end) => {
    const outputPath = path.join('uploads', `trimmed-${Date.now()}.mp4`);

    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
            .setStartTime(start)
            .setDuration(end - start)
            .output(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err))
            .run();
    });
};

// merge video utility
const mergeVideosUtil = async (filePaths) => {
    const outputPath = path.join('uploads', `merged-${Date.now()}.mp4`);

    return new Promise((resolve, reject) => {
        const ffmpegCommand = ffmpeg();

        filePaths.forEach(filePath => {
            ffmpegCommand.input(filePath);
        });

        ffmpegCommand
            .mergeToFile(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', (err) => reject(err));
    });
};

module.exports = { uploadVideoUtil, trimVideoUtil, mergeVideosUtil };




