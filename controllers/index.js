const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');
const apiRoutes = require('./api');

router.use('/', homeRoutes);

router.use('/dashboard', dashboardRoutes);

router.use('/api', apiRoutes);

module.exports = router;
