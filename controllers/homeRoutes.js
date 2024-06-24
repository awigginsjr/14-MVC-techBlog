// Purpose: to handle the routes for the home page
// const express = require('express');
const router = require('express').Router();
const { Post, User, Comments } = require(__dirname + '/../models/');
const { withAuth, withoutAuth } = require('../utils/auth');

// Get all posts
router.get('/', async (req, res) => {

  let posts = [];

  try {
    const postData = await Post.findAll({
      include: [User],
    });
        // Serialize the data so the template can read it
    posts = postData.map((post) => post.get({ plain: true }));
  } catch (err) {
    // res.status(500).json(err); // 500 status code means Internal Server Error
    console.log(err);
  }
    res.render('home', { posts, loggedIn: req.session.logged_in });
});

// Get a single post by id
router.get('/post/:id', async (req, res) => {
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
    
        
        if (postData) {
          const post = postData.get({ plain: true });
          console.log("post", post)
          
          res.render('post', { post, loggedIn: req.session.logged_in, });
        } else {
          res.status(404).end(); // if no post by that id, return 404 status code
        }
      } catch (err) {
        res.status(500).json(err); // 500 status code means Internal Server Error
    }
});

// Login route and login page
router.get('/login', withoutAuth, (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Signup route to signup page
router.get('/sign-up', withoutAuth, (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// export the router
module.exports = router;