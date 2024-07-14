const Video = require('../models/videoModel'); // import the model
const {Op} = require('sequelize');
const { uploadVideo, trimVideo, mergeVideos } = require('../utils/videoUtils'); // import video utitlities.

// upload video
exports.uploadVideo = async (req, res) => {

    try {
        const { title, description } = req.body;
        const { filename, size, path } = req.file;

        if(size > 25 * 1024 * 1024) { // 25 MB limit
            return res.status(400).json({ error: 'File size exceeds the limit' });
        }

        const duration = await uploadVideo(path); // use the uploadVideo utility function to get the duration

        if(duration < 5 || duration > 300) { // 5 seconds to 5 minutes duration limit
            return res.status(400).json({ error: 'Video duration out of range' });
        }

        const video = await Video.create({
            title,
            description,
            filePath: path,
            duration,
        });

        res.status(201).json(video);
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

        const trimmedVideoPath = await trimVideo(video.filePath, start, end);

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

        const mergedVideoPath = await mergeVideos(videos.map(v => v.filePath));

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


