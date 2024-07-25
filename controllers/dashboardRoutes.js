// const router = require("express").Router();
// const sequelize = require("../config/connection");
// const { Post, User, Comment } = require("../models");
// const withAuth = require("../utils/auth");
// router.get("/", withAuth, (req, res) => {
//   Post.findAll({
//     where: {
//       user_id: req.session.user_id,
//     },
//     attributes: ["id", "title", "content", "created_at"],
//     include: [
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       const posts = dbPostData.map((post) => post.get({ plain: true }));
//       res.render("dashboard", { posts, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// router.get("/edit/:id", withAuth, (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
//     attributes: ["id", "title", "content", "created_at"],
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//       {
//         model: Comment,
//         attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//         include: {
//           model: User,
//           attributes: ["username"],
//         },
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: "No post found with this id" });
//         return;
//       }

//       const post = dbPostData.get({ plain: true });
//       res.render("edit-post", { post, loggedIn: true });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
// router.get("/new", (req, res) => {
//   res.render("new-post");
// });

// router.get('/', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       where: {
//         userId: req.session.user_id,
//       },
//     });

//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render('dashboard', {
//       dashboard: true,
//       posts,
//       loggedIn: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

// const router = require("express").Router();
// const { Post, User, Comment } = require("../models");
// const withAuth = require("../utils/auth");

// // Main dashboard route
// router.get("/", withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.findAll({
//       where: {
//         user_id: req.session.user_id,
//       },
//       attributes: ["id", "title", "content", "created_at"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//       ],
//     });

//     const posts = dbPostData.map((post) => post.get({ plain: true }));
//     res.render("dashboard", { 
//       posts, 
//       loggedIn: true,
//       dashboard: true
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Edit post route
// router.get("/edit/:id", withAuth, async (req, res) => {
//   try {
//     const dbPostData = await Post.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "title", "content", "created_at"],
//       include: [
//         {
//           model: User,
//           attributes: ["username"],
//         },
//         {
//           model: Comment,
//           attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//       ],
//     });

//     if (!dbPostData) {
//       res.status(404).json({ message: "No post found with this id" });
//       return;
//     }
    
//     const post = dbPostData.get({ plain: true });
//     res.render("edit-post", { 
//       post, 
//       loggedIn: true,
//       dashboard: true
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // New post route
// router.get("/new", withAuth, (req, res) => {
//   res.render("new-post", { 
//     loggedIn: true,
//     dashboard: true
//   });
// });

// module.exports = router;