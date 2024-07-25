const router = require('express').Router();
require('dotenv').config();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// For Development API calls
if(process.env.NODE_ENV === 'dev'){
    const devRoutes = require('./dev');
    router.use('/dev', devRoutes);
}

module.exports = router;
