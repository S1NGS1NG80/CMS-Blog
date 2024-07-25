const router = require('express').Router();
const { User, Category, Post, Comment } = require('../models');
const { withAuth } = require('../utils/auth');


// Render the Dashboard by user_id
// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
        // Find the Posts by logged in user using session id
        const data = await Post.findAll({
            attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
            include: [
                { model: Category, attributes: ['title'] },
            ],
            where: {
                user_id: req.session.user_id
            }
        });

        // Return an error if record not found
        if (!data) {
            res.status(404).json({ message: 'Records for ' + req.session.user_id + ' not found.' });
            return;
        }

        // Serialize data so the template can read it
        const posts = data.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('dashboard', { posts, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Render the New-Post form
// Use withAuth middleware to prevent access to route
router.get('/new-post', withAuth, async (req, res) => {
    try {
        // Find the categories that the post can be linked to
        const categoryData = await Category.findAll({attributes: ['id','title']});
        
        // Return an error if record not found
        if (!categoryData) {
            res.status(404).json({ message: 'Records not found.' });
            return;
        }

        // Serialize data so the template can read it
        const categories = categoryData.map((category) => category.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('new-post', {categories: categories, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});


// Render the Edit-Post form by post_id
// Use withAuth middleware to prevent access to route
router.get('/edit-post/:id', withAuth, async (req, res) => {
    try {


        // Find the Posts by logged in user using session id
        const data = await Post.findByPk(req.params.id, {
            attributes: ['id','title', 'content','createdAt','updatedAt'],
            include: [
                { model: Category, attributes: ['id','title'] },
                { model: User, attributes: ['id']}
            ],
        });

        const categoryData = await Category.findAll({attributes: ['id','title']});
        
        // Return an error if record not found
        if (!data || !categoryData) {
            res.status(404).json({ message: 'Records not found.' });
            return;
        }

        // Return 401-unauthorized error if logged_in user is not the post owner
        console.log(data.user.id);
        console.log(req.session.user_id);
        if(req.session.user_id !== data.user.id){
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        // Serialize data so the template can read it
        const post = data.get({plain:true});
        const categories = categoryData.map((category) => category.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('edit-post', { ...post, categories: categories, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;