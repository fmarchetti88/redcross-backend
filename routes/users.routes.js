const { Committee, CommitteeUser, User } = require('../sequelize');
const { authJwt } = require('../middlewares');
const bcrypt = require('bcryptjs');
var router = require('express').Router();

const includeModels = {
  include: [{ model: CommitteeUser, include: [Committee] }]
};

// get all users
router.get('/users', [authJwt.verifyToken], (req, res) => {
  console.log(req);
  User.findAll(includeModels).then((users) => res.json(users));
});

// get user
router.get('/users/:id', [authJwt.verifyToken], (req, res) => {
  User.findByPk(req.params.id, includeModels)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// get user by username
router.get('/users/findbyusername/:username', [authJwt.verifyToken], (req, res) => {
  User.findOne({
    ...includeModels,
    where: { username: req.params.username }
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// get users by committee
router.get('/users/findByCommittee/:committeeId', [authJwt.verifyToken], (req, res) => {
  User.findAll({
    include: [
      {
        model: CommitteeUser,
        where: { committeeId: req.params.committeeId },
        include: [Committee]
      }
    ]
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'users not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// create a user
router.post('/users', [authJwt.verifyToken], (req, res) => {
  const user = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 8)
  };
  User.create(user)
    .then((user) => res.status(201).send({ id: user.id }))
    .catch((err) => res.status(409).json(err));
});

// modify user
router.put('/users/:id', [authJwt.verifyToken], (req, res) =>
  User.update(
    {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      flgPasswordChanged: req.body.flgPasswordChanged,
      email: req.body.email,
      birth_date: req.body.birth_date,
      gender: req.body.gender,
      withDrivingLicense: req.body.withDrivingLicense,
      superuser: req.body.superuser
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((result) => res.json(result))
    .catch((err) => res.status(409).json(err))
);

router.delete('/users/:id', [authJwt.verifyToken], (req, res) =>
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((user) => res.status(200).json({}))
    .catch((err) => res.status(409).json(err))
);

module.exports = router;
