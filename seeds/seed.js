// Purpose: This file is used to seed the database with the data from the userData.json and postData.json files.
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Import the data from the JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
  
    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
  
    for (const post of postData) {
      await Post.create({
        ...post,
        userId: users[Math.floor(Math.random() * users.length)].id,
      });
    }
    process.exit(0);
};
  
seedDatabase();