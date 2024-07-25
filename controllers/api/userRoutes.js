// const router = require('express').Router();
// const { User, Post, Comment } = require('../../models');
// router.get('/', (req, res) => {
//     User.findAll({
//             attributes: { exclude: ['[password'] }
//         })
//         .then(dbUserData => res.json(dbUserData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get('/:id', (req, res) => {
//     User.findOne({
//             attributes: { exclude: ['password'] },
//             where: {
//                 id: req.params.id
//             },
//             include: [{
//                     model: Post,
//                     attributes: [
//                         'id',
//                         'title',
//                         'content',
//                         'created_at'
//                     ]
//                 },

//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'created_at'],
//                     include: {
//                         model: Post,
//                         attributes: ['title']
//                     }
//                 },
//                 {
//                     model: Post,
//                     attributes: ['title'],
//                 }
//             ]
//         })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


// router.post('/', (req, res) => {

//     User.create({
//         username: req.body.username,
//         password: req.body.password
//     })

//     .then(dbUserData => {
//             req.session.save(() => {
//                 req.session.user_id = dbUserData.id;
//                 req.session.username = dbUserData.username;
//                 req.session.loggedIn = true;

//                 res.json(dbUserData);
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.post('/login', (req, res) => {
//     User.findOne({
//             where: {
//                 username: req.body.username
//             }
//         }).then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(400).json({ message: 'No user with that username!' });
//                 return;
//             }
//             const validPassword = dbUserData.checkPassword(req.body.password);

//             if (!validPassword) {
//                 res.status(400).json({ message: 'Incorrect password!' });
//                 return;
//             }
//             req.session.save(() => {

//                 req.session.user_id = dbUserData.id;
//                 req.session.username = dbUserData.username;
//                 req.session.loggedIn = true;

//                 res.json({ user: dbUserData, message: 'You are now logged in!' });
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             res.status(204).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });

// router.put('/:id', (req, res) => {

//     User.update(req.body, {
//             individualHooks: true,
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(dbUserData => {
//             if (!dbUserData[0]) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });

// });

// router.delete('/:id', (req, res) => {
//     User.destroy({
//             where: {
//                 id: req.params.id
//             }
//         })
//         .then(dbUserData => {
//             if (!dbUserData) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             res.json(dbUserData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// module.exports = router;

// Imports
const router = require("express").Router();
const { User } = require("../../models");

// Posts new user email, username, and password to database
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// When user logs in as an existing user then this route validates user credentials and logs user in if a match is found in the database
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log("no user found");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("no password match");
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// When user logs out the session is ended
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Exports
module.exports = router;