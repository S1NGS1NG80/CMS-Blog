const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// POST route for creating a new post
router.post('/', withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			...req.body,
			userId: req.session.userId,
		});
		res.json(newPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

// PUT route for updating post
router.put('/:id', withAuth, async (req, res) => {
	try {
		// updatedPost in square brackets bc = array of post elements; need to update specific properties only
		const [updatedPost] = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (updatedPost > 0) {
			// as long as array of post elements > 0, this will work. else not found bc post does not exist
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// DELETE route for deleting a post
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const [deletedPost] = Post.destroy({
			// removed await?!
			where: {
				id: req.params.id,
			},
		});

		if (deletedPost > 0) {
			// as long as array of post elements > 0, this will work. else its not found bc post does not exist
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
