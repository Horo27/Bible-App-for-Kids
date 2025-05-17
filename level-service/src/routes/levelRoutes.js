const express = require('express');
const levelControllers = require('../controllers/levelControllers');

const router = express.Router();

// Route to get chapters
router.get('/:id/getLevels', levelControllers.getLevels);


module.exports = router;