// Purpose: to handle the routes for the home page
const express = require('express');
const router = express.Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

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
        res.render('home', { dashboard: true, posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});

//
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
          include: [
            User,
            {
              model: Comments,
              include: [User],
            },
          ],
        });
    
        // if no post by that id, return 404 status code
        if (!postData) {
          return res.status(404).end(); // 404 status code means Not Found
        }
        
        const post = postData.get({ plain: true });
        res.render('post', {
          post,
          loggedIn: req.session.loggedIn,
        });
      } catch (err) {
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});

// Login route and login page
router.get('/login', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Signup route to signup page
router.get('/signup', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

// export the router
module.exports = router;