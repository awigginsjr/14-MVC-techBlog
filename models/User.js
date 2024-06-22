// Purpose: Create a User model that will be used to store user data in the database.
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');   // Import the bcrypt package
const sequelize = require('../config/connection');

class User extends Model {
  // Set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define table columns and configuration
User.init(
  {
    // Define an id column
    id: {
      // Use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // This is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true
    },
    // Define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // This means the password must be at least four characters long
        len: [4]
      }
    }
  },
  {
    // Hash the password before a new user is created or a user's password is updated
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash the password with a salt round of 10
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10 // Hash the password with a salt round of 10
        );
        return updatedUserData;
      },
    },
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Export the User model
module.exports = User;