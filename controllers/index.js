const router = require('express').Router();

const apiRoutes = require('./api');

const homeRoutes = require('./home-routes.js');

const dashboardRoutes = require('./dashboard-routes.js');

router.use('/api', apiRoutes);

router.use('/', homeRoutes);

router.use('/dashboard', dashboardRoutes);

// Handles any unmatched routes and returns a 404 status code
router.use((req, res) => {

    res.status(404).end();
});

module.exports = router;