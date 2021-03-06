const { Vehicle, Committee } = require('../sequelize');
const { authJwt } = require('../middlewares');
var router = require('express').Router();

const includeModels = {
  include: [{ model: Committee }]
};

// get all ehicles
router.get('/vehicles', [authJwt.verifyToken], (req, res) => {
  console.log(req);
  Vehicle.findAll(includeModels).then(vehicles => res.json(vehicles));
});

// get vehicle
router.get('/vehicles/:id', [authJwt.verifyToken], (req, res) => {
  Vehicle.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'vehicle not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// get vehicles by committee
router.get('/vehicles/findByCommittee/:committeeId', [authJwt.verifyToken], (req, res) => {
  Vehicle.findAll({
    ...includeModels,
    where: { committeeId: req.params.committeeId }
  })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'vehicles not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a vehicle
router.post('/vehicles', [authJwt.verifyToken], (req, res) => {
  console.log(req.body);
  Vehicle.create(req.body)
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(409).json(err));
});

// modify vehicle
router.put('/vehicles/:id', [authJwt.verifyToken], (req, res) =>
  Vehicle.update(
    {
      type: req.body.type,
      plate: req.body.plate,
      sign: req.body.sign,
      description: req.body.description,
      committeeId: req.body.committeeId,
      disabled: req.body.disabled
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

router.delete('/vehicles/:id', [authJwt.verifyToken], (req, res) =>
  Vehicle.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(vehicle => res.status(200).json({}))
    .catch(err => res.status(409).json(err))
);

module.exports = router;
