// Purpose: This file is used to seed the database with the data from the userData.json and postData.json files.
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Import the data from the JSON files
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
  try {
      await sequelize.sync({ force: true });
      // The force: true option will drop all the tables in the database and re-create them based on the models.

      const users = await User.bulkCreate(userData, {
          individualHooks: true,
          returning: true,
      });
      // The bulkCreate method is used to insert multiple records into the database at once.

      const postPromises = postData.map(async (post) => {
          try {
              const randomUserId = users[Math.floor(Math.random() * users.length)].id;
              await Post.create({
                  ...post,
                  user_id: randomUserId,
              });
          } catch (error) {
              console.error('Error creating post:', error);
          }
      });
      // The create method is used to insert a single record into the database.

      await Promise.all(postPromises);

      console.log('Seeding complete!');
      process.exit(0); // Exit the Node.js process with a success status code
  } catch (error) {
      console.error('Error seeding the database:', error);
      process.exit(1); // Exit the Node.js process with a failure status code
  }
};

seedDatabase();

// const seedDatabase = async () => {
//     try {
//       await sequelize.sync({ force: true });
//       // The force: true option will drop all the tables in the database and re-create them based on the models.
  
//       const users = await User.bulkCreate(userData, {
//         individualHooks: true,
//         returning: true,
//       });
//       // The bulkCreate method is used to insert multiple records into the database at once.
  
//       const postPromises = postData.map(post => {
//         return Post.create({
//           ...post,
//           user_id: users[Math.floor(Math.random() * users.length)].id,
//         });
//       });
//       // The create method is used to insert a single record into the database.
  
//       await Promise.all(postPromises);
  
//       console.log('Seeding complete!');
//       process.exit(0); // Exit the Node.js process with a success status code
//     } catch (error) {
//       console.error('Error seeding the database:', error);
//       process.exit(1); // Exit the Node.js process with a failure status code
//     }
// };
  
// seedDatabase();

// // Seed the database with the data
// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });
// // The force: true option will drop all the tables in the database and re-create them based on the models.
//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });
// // The bulkCreate method is used to insert multiple records into the database at once.
//   for (const post of postData) {
//     await Post.create({
//       ...post,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }
//     console.log('Seeding complete!');
// // The create method is used to insert a single record into the database.
//   process.exit(0);
// };
// // The process.exit(0) method is used to exit the Node.js process with a success status code.
// seedDatabase();