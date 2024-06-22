// Purpose: to create routes for comments
const router = require('express').Router();
const { Comments } = require('../../models/');
const { apiAuth }  = require('../../utils/auth');

// Create a new comment with auth
router.post('/', apiAuth, async (req, res) => { // req is the request object, res is the response object
    // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.
    try {
        const newComments = await Comments.create({ // new comment is created with the user_id from the session
            ...req.body,// The req.body object contains the data that the client sends to the server.
            userId: req.session.user_id, // Add userId from the session to the comment object
        });

        res.status(200).json(newComments); // Respond with the newly created comment as a JSON object and a 200 status code (OK)
    } catch (err) {
        res.status(500).json(err); // If an error occurs, respond with the error object and a 500 status code (Internal Server Error)
    }
});
// export the router with all the routes mounted on it
module.exports = router;