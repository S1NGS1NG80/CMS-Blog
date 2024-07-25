const { User } = require("../models");

const userData = [
  {
    username: "John",
    password: "john",
  },
  {
    username: "Jake",
    password: "jake",
  },
  {
    username: "Joe",
    password: "joe1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;