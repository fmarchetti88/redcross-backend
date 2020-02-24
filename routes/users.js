const { Committee, CommitteeUser, User } = require('./../sequelize');
var router = require('express').Router();

const includeModels = {
  include: [{ model: CommitteeUser, include: [Committee] }]
};

// get all users
router.get('/users', (req, res) => {
  console.log(req);
  User.findAll(includeModels).then(users => res.json(users));
});

// get user
router.get('/users/:id', (req, res) => {
  User.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// get user by username
router.get('/users/findbyusername/:username', (req, res) => {
  User.findOne({
    ...includeModels,
    where: { username: req.params.username }
  })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'user not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// get users by committee
router.get('/users/findByCommittee/:committeeId', (req, res) => {
  User.findAll({
    include: [
      {
        model: CommitteeUser,
        where: { committeeId: req.params.committeeId },
        include: [Committee]
      }
    ]
  })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'users not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a user
router.post('/users', (req, res) => {
  console.log(req.body);
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(409).json(err));
});

// modify user
router.put('/users/:id', (req, res) =>
  User.update(
    {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      flgPasswordChanged: req.body.flgPasswordChanged,
      email: req.body.email,
      birth_date: req.body.birth_date,
      gender: req.body.gender,
      superuser: req.body.superuser
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(result => res.json(result))
    .catch(err => res.status(409).json(err))
);

router.delete('/users/:id', (req, res) =>
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(user => res.status(200).json({}))
    .catch(err => res.status(409).json(err))
);

module.exports = router;
