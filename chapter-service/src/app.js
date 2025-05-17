const express = require('express');
const bodyParser = require('body-parser');
const chapterRoutes = require('./routes/chapterRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/chapter', chapterRoutes);

// Start the server
const PORT = config.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Chapter-service is running on port ${PORT}`);
});

module.exports = app;