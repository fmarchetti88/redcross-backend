const controller = require('../controllers/auth.controller');
var router = require('express').Router();
const { verifySignUp } = require('../middlewares');

router.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});
router.post('/auth/signup', [verifySignUp.checkDuplicateUsernameOrEmail], controller.signup);
router.post('/auth/signin', controller.signin);

module.exports = router;
