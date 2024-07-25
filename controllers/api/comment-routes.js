const router = require('express').Router();
const { User, Category, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    // create a new record
    try {
        const data = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;

