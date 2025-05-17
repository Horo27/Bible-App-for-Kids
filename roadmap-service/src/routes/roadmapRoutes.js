const express = require('express');
const roadmapController = require('../controllers/roadmapController');

const router = express.Router();

// Route to get chapters
router.get('/:id/roadmap', roadmapController.getRoadmap);


module.exports = router;