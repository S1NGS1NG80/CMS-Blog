const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

// POST route to create new comment
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comment.create({
			...req.body,
			userId: req.session.userId,
		});
	
		res.json(newComment);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;