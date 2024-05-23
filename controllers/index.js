const express = require('express');
const router = express.Router();

// Import route modules
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/');
const dashRoutes = require('./dashRoutes');

// Define routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashRoutes);

module.exports = router;