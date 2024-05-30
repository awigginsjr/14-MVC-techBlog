const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth= require('../utils/auth');

// Get all posts
router.get('/', withAuth, async (req, res) => {
    try {
        // Get all posts and include the user who posted them
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        // Serialize the data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', { dashboard: true, posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});

// new post 
router.get('/new', withAuth, (req, res) => {

    // If the user is logged in, allow them to create a new post
    res.render('newPost', {
        dashboard: true,
        loggedIn: req.session.loggedIn,
    });
});

// edit post
router.get('/edit/:id', withAuth, async (req, res) => { // req is the request object, res is the response object
    try { // The try...catch statement marks a block of statements to try and specifies a response if an error is thrown.

        // Find the post by its id
        const postData = await Post.findByPk(req.params.id);
        if (postData) {

            // Serialize the data so the template can read it
            const post = postData.get({ plain: true });

            // Pass the serialized data into the template
            res.render('editPost', { dashboard: true, post, loggedIn: req.session.loggedIn });
        } else {
            res.status(404).end(); // 404 status code means Not Found
        }
    } catch (err) {
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});

// export the router
module.exports = router;