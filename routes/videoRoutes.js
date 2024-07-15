const express = require('express');
const router = express.Router();
const multer = require('multer');
const videoController = require('../controllers/videoController');
const path = require('path');


// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the videos
    },
    filename: (req, file, cb) => {
        // Use original name with current timestamp to avoid collisions
        const uniqueSuffix = Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix); // e.g. video-1616161616161.mp4
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Video management operations
 */

/**
 * @swagger
 * /api/videos/upload:
 *   post:
 *     summary: Upload a video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               video:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Video uploaded successfully
 *       400:
 *         description: Invalid file size or duration
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/videos/trim:
 *   post:
 *     summary: Trim a video
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               start:
 *                 type: number
 *               end:
 *                 type: number
 *     responses:
 *       200:
 *         description: Video trimmed successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/videos/merge:
 *   post:
 *     summary: Merge multiple videos
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               videoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Videos merged successfully
 *       404:
 *         description: Some videos not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/videos/generate-link:
 *   post:
 *     summary: Generate a shareable link with expiry
 *     tags: [Videos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               expiresIn:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Link generated successfully
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: List of videos
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/videos/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the video
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Video found
 *       404:
 *         description: Video not found
 *       500:
 *         description: Server error
 */

router.post('/upload', upload.single('video'), videoController.uploadVideo);
router.post('/trim', videoController.trimVideo);
router.post('/merge', videoController.mergeVideos);
router.post('/generate-link', videoController.generateLink);

// adding get requests to check the uploaded videos.
router.get('/', videoController.getAllVideos);

// get a particular video by id
router.get('/:id', videoController.getVideoById);

module.exports = router;