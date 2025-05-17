const quizzes = require('../utils/quizzes');

class quizController {
    // GET /quiz/:quizId
    getQuiz(req, res) {
        const quizId = parseInt(req.params.quizId, 10);
        const quiz = quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return res.status(404).json({ message: `Quiz ${quizId} not found` });
        }
        // Remove correctAnswer from each question before sending to frontend
        const quizToSend = {
            id: quiz.id,
            title: quiz.title,
            questions: quiz.questions.map(({ correctAnswer, ...rest }) => rest)
        };
        res.json(quizToSend);
    }

    // GET /quiz/:quizId/question/:questionId
    getQuestion(req, res) {
        const quizId = parseInt(req.params.quizId, 10);
        const questionId = parseInt(req.params.questionId, 10);
        const quiz = quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        const question = quiz.questions.find(q => q.id === questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        // Remove correctAnswer before sending to frontend
        const { correctAnswer, ...questionToSend } = question;
        res.json(questionToSend);
    }

    // POST /quiz/:quizId/question/:questionId/answer
    checkAnswer(req, res) {
        const quizId = parseInt(req.params.quizId, 10);
        const questionId = parseInt(req.params.questionId, 10);
        const { answer } = req.body; // expects answer as index
        const quiz = quizzes.find(q => q.id === quizId);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        const question = quiz.questions.find(q => q.id === questionId);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        if (typeof answer !== 'number' || answer < 0 || answer > 3) {
            return res.status(400).json({ correct: false, message: "Invalid answer format." });
        }
        const isCorrect = answer === question.correctAnswer;
        res.json({ correct: isCorrect });
    }
}

module.exports = new quizController();