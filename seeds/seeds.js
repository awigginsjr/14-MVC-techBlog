// Purpose: This file is used to seed the database with the data from the userData.json and postData.json files.
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Import the data from the JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');

// Seed the database with the data
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
// The force: true option will drop all the tables in the database and re-create them based on the models.
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
// The bulkCreate method is used to insert multiple records into the database at once.
  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
    console.log('Seeding complete!');
// The create method is used to insert a single record into the database.
  process.exit(0);
};
// The process.exit(0) method is used to exit the Node.js process with a success status code.
seedDatabase();