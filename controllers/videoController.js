const Video = require('../models/videoModel'); // import the model
const {Op} = require('sequelize');
const { uploadVideoUtil, trimVideoUtil, mergeVideosUtil } = require('../utils/videoUtils'); // import video utitlities.
const fs = require('fs');

// upload video
exports.uploadVideo = async (req, res) => {

    try {

        console.log(req.body);
        const title = req.body.title;
        const description = req.body.description;
        const filePath = req.body.filePath;
        // get the video file stats
        const stats = fs.statSync(filePath)
        // get the size of the video in bytes
        const size = stats.size;

        if(size > 25 * 1024 * 1024) { // 25 MB limit
            return res.status(400).json({ error: 'File size exceeds the limit' });
        }

        const duration = await uploadVideoUtil(filePath); // use the uploadVideo utility function to get the duration
        console.log(duration);

        if(duration < 5 || duration > 300) { // 5 seconds to 5 minutes duration limit
            return res.status(400).json({ error: 'Video duration out of range' });
        }

        const video = await Video.create({
            title,
            description,
            filePath,
            duration,
        });

        res.status(201).json(video);
        console.log("Video uploaded to database !")
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// trim video
exports.trimVideo = async(req, res) => {

    try {
        const { id, start, end } = req.body;
        const video = await Video.findByPk(id);

        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const trimmedVideoPath = await trimVideoUtil(video.filePath, start, end);

        res.status(200).json({ filePath: trimmedVideoPath });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// merge videos
exports.mergeVideos = async(req, res) => {

    try{
        const { videoIds } = req.body;
        const videos = await Video.findAll({
            where: { id: { [Op.in]: videoIds } },
        });

        if (videos.length !== videoIds.length) {
            return res.status(404).json({ error: 'Some videos not found' });
        }

        const mergedVideoPath = await mergeVideosUtil(videos.map(v => v.filePath));

        res.status(200).json({ filePath: mergedVideoPath });
    } 
    catch (error){
        res.status(500).json({ error: error.message });
    }
};

// generate link with expiry
exports.generateLink = async (req, res) =>{

    try {

        const { id, expiresIn } = req.body;
        const video = await Video.findByPk(id); // search for a single instance using the primary key.

        if(!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const expiresAt = new Date(Date.now() + expiresIn * 1000);
        video.expiresAt = expiresAt;
        await video.save();

        const link = `${req.protocol}://${req.get('host')}/videos/${id}`;

        res.status(200).json({ link, expiresAt });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.findAll();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// get a single video by id
exports.getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


