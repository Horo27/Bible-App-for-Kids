const express = require('express');
const bodyParser = require('body-parser');
const levelRoutes = require('./routes/levelRoutes');
const config = require('./config');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/levels', levelRoutes);

// Start the server
const PORT = config.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Level-service is running on port ${PORT}`);
});

module.exports = app;