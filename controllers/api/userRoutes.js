// Purpose: to handle the routes for the user model
const router = require('express').Router();
const { User } = require('../../models');
// const withAuth = require('../../utils/auth');

// Create a new user
router.post('/', async (req, res) => {
    try {
        // new user is created with the data from the req.body object
        const userData = await User.create(req.body);

        // The session is saved with the user_id, username, and logged_in status
        req.session.save(() => {
            req.session.user_id = userData.id; 
            req.session.username = userData.username;
            req.session.logged_in = true;

            // userData is returned as a JSON object
            res.status(200).json(userData); // 200 status code means OK
        });
    } catch (err) {
        // handle the error
        res.status(400).json(err); // 400 status code means Bad Request
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        // The userData is found based on the username from the req.body object
        const userData = await User.findOne({ where: { username: req.body.username } });

// console.log(req.body);
// console.log(userData);

        // If the userData is null, a 400 status code is returned with a message
        if (!userData) {
            res
                .status(400) // 400 status code means Bad Request
                // The message is returned as a JSON object
                .json({ message: 'The username or password you entered is incorrect. Please try again.' });
            return;
        }

        // The checkPassword method is called on the userData object
        const validPassword = await userData.checkPassword(req.body.password);

        // If the password is invalid, a 400 status code is returned with a message
        if (!validPassword) {
            res
                .status(400) // 400 status code means Bad Request
                // The message is returned as a JSON object
                .json({ message: 'The username or password you entered is incorrect. Please try again.' });
            return;
        }
        // The session is saved with the user_id, username, and logged_in status
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in= true;

            // userData is returned as a JSON object with a message
            res.json({ user: userData, message: 'Login successful! Welcome back!' });
        });

    } catch (err) {
        // handle the error
        res.status(400).json(err); // 400 status code means Bad Request
    }
});

// Logout route
router.post('/logout', (req, res) => {
    // If the session is logged_in, the session is destroyed
    if (req.session.logged_in) {
        req.session.destroy(() => { // The destroy method is called on the session object
            res.status(204).end(); // 204 status code means No Content
        });
        // If the session is not logged_in, a 404 status code is returned
    } else {
        res.status(404).end(); // 404 status code means Not Found
    }
});

// export the router with all the routes mounted on it
module.exports = router;