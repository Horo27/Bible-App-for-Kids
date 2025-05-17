const express = require('express');
const bodyParser = require('body-parser');
const roadmapRoutes = require('./routes/roadmapRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/roadmap', roadmapRoutes);

// Start the server
const PORT = config.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Roadmap-service is running on port ${PORT}`);
});

module.exports = app;