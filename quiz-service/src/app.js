const express = require('express');
const bodyParser = require('body-parser');
const quizRoutes = require('./routes/quizRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/quiz', quizRoutes);

// Start the server
const PORT = config.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Quiz-service is running on port ${PORT}`);
});

module.exports = app;