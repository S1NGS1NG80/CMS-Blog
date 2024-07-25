const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.js');
const postData = require('./postData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true, // makes sure pw is hashed using hooks defined in User model
    returning: true,
  });

  const users = await User.findAll();

  // create array of post obj by mapping over the postData array & adding userId property to each post obj, which is obtained by finding the user with the corresponding 'username' property in the 'users' array fetched above

  const posts = postData.map(post => ({
    ...post,
    userId: users.find(user => user.username === post.username).id,
  }));

  // pass array of post objs created above into bulkCreate method to seed Post model with postData.json data
  await Post.bulkCreate(posts);

  process.exit(0);
};

seedDatabase();