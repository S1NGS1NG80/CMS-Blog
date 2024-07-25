const router = require('express').Router();
const { User, Post, Comment } = require('../models/');

// GET all posts for homepage
router.get('/', async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [User],
		});
		const posts = postData.map((post) => post.get({ plain: true }));
		// render on allPosts view
		res.render('allPosts', {
			posts,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET single post by id /post/:id
router.get('/post/:id', async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				User,
				{
					model: Comment,
					include: [User],
				},
			],
		});
		if (postData) {
			const post = postData.get({ plain: true });
			// render on singlePost view
			res.render('singlePost', {
				post,
			});
		} else {
			res.status(404).end();
		}
	} catch (error) {
		res.status(500).json(err);
	}
});

// GET login route
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	// if logged in --> homepage, else --> login view
	res.render('login');
});

// GET signup route
router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	// if logged in --> homepage, else --> signup view
	res.render('signup');
});

module.exports = router;
