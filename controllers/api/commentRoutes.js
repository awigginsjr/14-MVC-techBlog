// Purpose: to create routes for comments
const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth  = require('../../utils/auth');

// Create a new comment with auth
router.post('/', withAuth, async (req, res) => { // req is the request object, res is the response object

    // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.
    try {
        // new comment is created with the user_id from the session
        const newComments = await Comments.create({
            ...req.body,// The req.body object contains the data that the client sends to the server.
            user_id: req.session.user_id, 
        });

        // newComments is returned as a JSON object
        res.status(200).json(newComments); // 200 status code means OK
    } catch (err) {
        res.status(400).json(err); // 400 status code means Bad Request
    }
});

// export the router with all the routes mounted on it
module.exports = router;