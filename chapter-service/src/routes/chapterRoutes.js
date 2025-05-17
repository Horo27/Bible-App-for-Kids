const express = require('express');
const chapterController = require('../controllers/chapterController');

const router = express.Router();

// Route to get chapters
router.get('/getChapters', chapterController.getChapters);


module.exports = router;