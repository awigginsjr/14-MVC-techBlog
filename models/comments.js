// Purpose: To create a Comment model for the database
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Create a Comment model
class Comments extends Model {}

// Set up fields and rules for Comments model
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comments_text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    // Pass in our imported sequelize connection (the direct connection to our database)
    sequelize, // This is the connection to the database
    freezeTableName: true, // This means the model won't create a table called Comment, it will be comments
    underscored: true,
    modelName: 'comments' // This will be the name of the table in the database
  }
);

// Export the Comments model for use in other modules
module.exports = Comments;