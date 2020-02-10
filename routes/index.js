var router = require('express').Router();

router.use('/api', require('./users'));
router.use('/api', require('./vehicles'));
router.use('/api', require('./committees_users'));
router.use('/api', require('./trips'));

module.exports = router;
