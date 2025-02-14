const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// Attempts to retrieve and render all posts created by the current user
router.get('/', withAuth, async (req, res) => {
try{
    const dashboard = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        }) //runs a get query to get all of users previous posts.
            const generateDash = await dashboard
            const posts = generateDash.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true }); //maps all the posts in an array and then renders them to the dashboard 
        }

        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});
// route for editing a post
router.get('/edit/:id', withAuth, async (req, res) => {
    try{
    const editPost = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
            const newEdit = await editPost
            if (!newEdit) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const post = newEdit.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        }

        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
})
// handle new post route
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;