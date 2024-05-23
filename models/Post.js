// Purpose: To create the Post model for the database
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Create a Post model
class Post extends Model {}

// Set up fields and rules for Post model
Post.init(
  {

    // This is the column that will hold the post id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    // This is the column that will hold the post title
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // This is the column that will hold the post text
    post_text: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // This is the column that will hold the foreign key value
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize, // This is the connection to the database
    freezeTableName: true, // This means the model won't create a table called Post, it will be posts
    underscored: true,
    modelName: 'post' // This will be the name of the table in the database
  }
);

// Export the Post model for use in other modules
module.exports = Post;
