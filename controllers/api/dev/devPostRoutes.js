const router = require('express').Router();
const { User, Category, Post, Comment } = require('../../../models');

router.get('/', async (req, res) => {
    // Find all records and include other model data
    try {
        const data = await Post.findAll({            
            attributes: ['id', 'title', 'content','createdAt','updatedAt'],
            include: [
                { model: User, attributes: ['name'] },
                { model: Category, attributes: ['title'] },
                { model: Comment, attributes: ['content'], include: {model: User, attributes: ['name','createdAt']}}
            ],
        });

        const posts = data.map((post) => post.get({ plain: true }));
        // console.table(posts);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render the Post Page
router.get('/view/:id', async (req, res) => {
    // Find record by ID and include other model data
    try {
        const data = await Post.findByPk(req.params.id, {
            attributes: ['id','title', 'content','createdAt','updatedAt'],
            include: [
                { model: User, attributes: ['name'] },
                { model: Category, attributes: ['title'] },
                { model: Comment, attributes: ['content'], include: {model: User, attributes: ['name','createdAt']}}
            ],
        });
        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }

        // const comments = await data.getComments();
        
        const post = data.get({plain: true});
        console.log(post.comments);
        
        // res.status(200).json(data);
        res.render('postpage', { ...post, comments: post.comments, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Render the Dashboard by user_id
router.get('/user/:id', async (req, res) => {
    // Find record by ID and include other model data
    try {
        const data = await Post.findAll({
            attributes: ['id','title', 'content','createdAt','updatedAt'],
            include: [
                // { model: User, attributes: ['name'] },
                { model: Category, attributes: ['title'] },
            ],
            where: {
                user_id: req.params.id
            }
        });

        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }

        const posts = data.map((post) => post.get({ plain: true }));
        
        // res.status(200).json(posts);
        res.render('dashboard', { posts, logged_in: req.session.logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/:id', async (req, res) => {
    // Find record by ID and include other model data
    try {
        const data = await Post.findByPk(req.params.id, {
            attributes: ['title', 'content','createdAt','updatedAt'],
            include: [
                { model: User, attributes: ['id','name'] },
                { model: Category, attributes: ['title'] },
                { model: Comment, attributes: ['content'], include: {model: User, attributes: ['name','createdAt']}}
            ],
        });
        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Record ' + req.params.id + ' not found.' });
            return;
        }

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    // create a new record
    try {
        const data = await Post.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
});


router.put('/:id', async (req, res) => {
    // update a record by its `id` value
    try {
        const data = await Post.update(req.body, {
            where: { id: req.params.id }
        });
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