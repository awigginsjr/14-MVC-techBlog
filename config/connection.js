// sequelize connection to database
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for username and password
let sequelize;

// environment variable for JawsDB that holds the URL to the database
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  // environment variable for local database that holds the URL to the database
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
// export the connection
module.exports = sequelize;