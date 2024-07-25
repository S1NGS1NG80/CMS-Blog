const router = require('express').Router();
const { User, Category, Post, Comment } = require('../../models');

router.post('/', async (req, res) => {
    // create a new record
    try {
        const data = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a record by its `id` value
    try {
        const data = await Post.update(
            {
                ...req.body,
                user_id: req.session.user_id
            },
            {
                where: { id: req.params.id }
            }
        );
        // Return an error if data not found
        if (data[0] === 0) {
            res.status(400).json({ message: 'Record ' + req.params.id + ' is not found or updated.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' updated.', updated_to: req.body });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.delete('/:id', async (req, res) => {
    // delete a record by its `id` value
    try {
        const data = await Post.destroy({
            where: { id: req.params.id }
        });
        
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }
        res.status(200).json({ message: 'Record ' + req.params.id + ' is deleted.' });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;

