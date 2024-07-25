const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();
//the get request for the main page.
router.get('/', async (req, res) => {
try{
    const findPosts = await Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ], //gets all variables stored in the db
            include: [{
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'], //includes the comments that are stored on posts
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username'] //gets the username attached to a post
                }
            ]
        })
            const posts = findPosts.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn }); //after the above, we map over the array of posts and render out the homepage located in views.
    }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return; //if person is logged in, redirect to home page.
    }
    res.render('login'); //if not, render the login page.
});

router.get('/signup', (req, res) => {
    res.render('signup');
}); //If you click the signup link it takes you to the handlebars signup page!

router.get('/post/:id', async (req, res) => {
try{
    const postbyID = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
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
        })
        const singlepost = await postbyID
            if (!singlepost) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = singlepost.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn }); //This is similar to how the homepage works, except if we click on a post it instead renders the individual post!


        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

router.get('/posts-comments', async (req, res) => {
try{
    const findComment = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
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
        })
        const findnewComment = await findComment
            if (!findnewComment) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = findnewComment.get({ plain: true });

            res.render('posts-comments', { post, loggedIn: req.session.loggedIn });
        }
        catch(err) {
            console.log(err);
            res.status(500).json(err);
        };
});

module.exports = router;