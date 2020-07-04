var router = require('express').Router();

router.use('/api', require('./regions.routes_no_auth'));
router.use('/api', require('./countries.routes_no_auth'));
router.use('/api', require('./cities.routes_no_auth'));
router.use('/api', require('./committees.routes_no_auth'));

module.exports = router;
