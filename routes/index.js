var router = require('express').Router();

router.use('/api', require('./users'));
router.use('/api', require('./regions'));
router.use('/api', require('./countries'));
router.use('/api', require('./cities'));
router.use('/api', require('./committees'));
router.use('/api', require('./vehicles'));
router.use('/api', require('./committees_users'));
router.use('/api', require('./trips'));

module.exports = router;
