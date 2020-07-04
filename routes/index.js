var router = require('express').Router();

router.use('/api', require('./users.routes'));
router.use('/api', require('./vehicles.routes'));
router.use('/api', require('./committees_users.routes'));
router.use('/api', require('./trips.routes'));
router.use('/api', require('./trips_users.routes'));
router.use('/api', require('./auth.routes'));

module.exports = router;
