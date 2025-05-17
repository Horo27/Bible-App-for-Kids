const express = require('express');
const quizController = require('../controllers/quizController');

const router = express.Router();

// Get the quiz
router.get('/:quizId', quizController.getQuiz);

// Check the quiz answer
router.get('/:quizId/question/:questionId', quizController.getQuestion);

// Check the quiz answer
router.post('/:quizId/question/:questionId/answer', quizController.checkAnswer);

module.exports = router;