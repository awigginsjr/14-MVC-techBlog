// Initialize express router
const express = require('express');
const router = express.Router();

// Import route modules from their respective files
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/');
const dashRoutes = require('./dashRoutes');

// Define routes
// Mount the imported routes on their respective endpoints
router.use('/', homeRoutes); // Mount the homeRoutes on the root endpoint
router.use('/api', apiRoutes); // Mount the apiRoutes on the /api endpoint
router.use('/dashboard', dashRoutes); // Mount the dashRoutes on the /dashboard endpoint

// Export the router with all the routes mounted on it
module.exports = router;