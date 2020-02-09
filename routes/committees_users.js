const { CommitteeUser, Committee, User } = require('../sequelize');
var router = require('express').Router();

const includeModels = {
  include: [{ model: Committee }, { model: User }]
};

// get all committees_users
router.get('/committees_users', (req, res) => {
  console.log(req);
  CommitteeUser.findAll(includeModels).then(committees_users =>
    res.json(committees_users)
  );
});

// get committees_users
router.get('/committees_users/:id', (req, res) => {
  CommitteeUser.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'committees_users not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a committees_users
router.post('/committees_users', (req, res) => {
  console.log(req.body);
  CommitteeUser.create(req.body)
    .then(committees_users => res.json(committees_users))
    .catch(err => res.status(409).json(err));
});

// modify committees_users
router.put('/committees_users/:id', (req, res) =>
  CommitteeUser.update(
    {
      description: req.body.description,
      userId: req.body.userId,
      commiteeId: req.body.commiteeId
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(result => res.json(result))
    .catch(err => req.status(409).json(err))
);

router.delete('/committees_users/:id', (req, res) =>
  CommitteeUser.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(committees_users => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
