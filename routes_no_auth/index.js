var router = require('express').Router();

router.use('/api', require('./regions'));
router.use('/api', require('./countries'));
router.use('/api', require('./cities'));
router.use('/api', require('./committees'));

module.exports = router;
