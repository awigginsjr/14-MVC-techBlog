// Purpose: API routes for user, post, and comments
const router = require('express').Router();

// Import the userRoutes, postRoutes, and commentRoutes
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// middleware to use the imported routes
// mount the imported routes on their respective endpoints
router.use('/users', userRoutes); // Mount the userRoutes on the /users endpoint
router.use('/posts', postRoutes); // Mount the postRoutes on the /posts endpoint
router.use('/comments', commentRoutes); // Mount the commentRoutes on the /comments endpoint

// export the router with all the routes mounted on it
module.exports = router;