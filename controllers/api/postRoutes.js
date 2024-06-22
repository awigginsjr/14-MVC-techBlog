// Purpose: to create, update, and delete posts
const router = require('express').Router();
const { Post } = require('../../models/');
const { apiAuth } = require('../../utils/auth');

// Create a new post with auth 
router.post('/', apiAuth, async (req, res) => { // req is the request object, res is the response object
    // The req.body object contains the data that the client sends to the server.
    const body = req.body; 
    // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.
    try {
        // new post is created
        const newPost = await Post.create({ ...body, userId: req.session.user_id });
        // newPost is returned as a JSON object
        res.json(newPost);
    } catch (err) {
        // handle the error
        res.status(400).json(err); // 400 status code means Bad Request
    }
});

// Update a post with auth
router.put('/:id', apiAuth, async (req, res) => {
    // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.
    try {
        // The update method is used to update the post data based on the req.body object.
        const [affectedRows] = await Post.update(req.body, {
            where: {
                id: req.params.id, // The id of the post is taken from the req.params object.
            },
        });
        // If the affectedRows is greater than 0, the status code is 200.
        if (affectedRows > 0) {
            res.status(200).end(); // 200 status code means OK
        } else {
            res.status(404).end(); // 404 status code means Not Found
        }
    } catch (err) {
        // handle the error
        res.status(500).json(err); //  500 status code means Internal Server Error
    }
});


// Delete a post with auth
router.delete('/:id', apiAuth, async (req, res) => { 
    // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.
    try {
        // The destroy method is used to delete the post based on the req.params.id.
        const [affectedRows] = Post.destroy({
            where: {
                id: req.params.id, // The id is taken from the req.params.id
            },
        });
        // If the affectedRows is greater than 0, the status code is 200.
        if (affectedRows > 0) {
            res.status(200).end(); // 200 status code means OK
        } else {
            res.status(404).end(); // 404 status code means Not Found
        }
    } catch (err) {
        // handle the error
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});
// Export the router with all the routes mounted on it
module.exports = router;
