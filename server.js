// import required modules and packages for the server
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// import routes and helpers
const routes = require('./controllers');
const helpers = require('./utils/helpers');

// import sequelize connection
const sequelize = require('./config/connection');
// const { Comments } = require('./models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// create the Express.js server with port 3001
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {
    // Session will automatically expire in 10 minutes
    maxAge: 600000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  // avoid resaving the session if nothing has changed
  resave: false,
  // ensure that the session is not saved unless modified
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Session middleware
app.use(session(sess));

// Handlebars engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes middleware
app.use(routes);

// Sync sequelize models and start the Express.js server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port 3001!`));
});
