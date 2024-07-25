// const router = require('express').Router();
// const { Post, User, Comment } = require('../../models');
// const sequelize = require('../../config/connection');
// const withAuth = require('../../utils/auth');

// router.get('/', (req, res) => {
//     console.log('======================');
//     Post.findAll({
//             attributes: ['id',
//                 'title',
//                 'content',
//                 'created_at'
//             ],
//             order: [
//                 ['created_at', 'DESC']
//             ],
//             include: [{
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 }
//             ]
//         })
//         .then(dbPostData => res.json(dbPostData.reverse()))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });

// });
// router.get('/:id', (req, res) => {
//     Post.findOne({
//             where: {
//                 id: req.params.id
//             },
//             attributes: ['id',
//                 'content',
//                 'title',
//                 'created_at'
//             ],
//             include: [{
//                     model: User,
//                     attributes: ['username']
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                     include: {
//                         model: User,
//                         attributes: ['username']
//                     }
//                 }
//             ]
//         })
//         .then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }
//             res.json(dbPostData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.post('/', withAuth, (req, res) => {
//     Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id
//         })
//         .then(dbPostData => res.json(dbPostData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.put('/:id', withAuth, (req, res) => {
//     Post.update({
//             title: req.body.title,
//             content: req.body.content
//         }, {
//             where: {
//                 id: req.params.id
//             }
//         }).then(dbPostData => {
//             if (!dbPostData) {
//                 res.status(404).json({ message: 'No post found with this id' });
//                 return;
//             }
//             res.json(dbPostData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });
// router.delete('/:id', withAuth, (req, res) => {
//     Post.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(dbPostData => {
//         if (!dbPostData) {
//             res.status(404).json({ message: 'No post found with this id' });
//             return;
//         }
//         res.json(dbPostData);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

// module.exports = router;

// Imports
const router = require("express").Router();
const { BlogPost } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to create a new blog post
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// Route to edit an existing blog post
router.put("/:id", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const blogPostData = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete an existing blog post
router.delete("/:id", withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogPostData) {
      res.status(404).json({ message: "No blog post found with this id!" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
module.exports = router;