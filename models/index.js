// Purpose: This file is used to export all the models in the models folder so that they can be used in other files.
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// post belongs to user 
Post.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// user has many posts 
Post.hasMany(Comments, {
    foreignKey: 'postId',
    onDelete: 'CASCADE'
});

// comments belong to user
Comments.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

// export the models to be used in other files (i.e., Post, Comments, User)
module.exports = { User, Post, Comments };