const router = require('express').Router();


const devUserRoutes = require('./devUserRoutes');
const devCategoryRoutes = require('./devCategoryRoutes');
const devPostRoutes = require('./devPostRoutes');
const devCommentRoutes = require('./devCommentRoutes');

router.use('/users', devUserRoutes);
router.use('/categories', devCategoryRoutes);
router.use('/posts', devPostRoutes);
router.use('/comments', devCommentRoutes);

module.exports = router;