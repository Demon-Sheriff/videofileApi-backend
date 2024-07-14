const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoController = require('../controllers/videoController');

// set up multer to store files in the 'uploads/' directory
const upload = multer({dest: 'uploads/'});

router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.post('/trim', videoController.trimVideo);
router.post('/merge', videoController.mergeVideos);
router.post('/generate-link', videoController.generateLink);

module.exports = router;