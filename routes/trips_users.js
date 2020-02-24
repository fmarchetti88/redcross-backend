const { Trip, TripUser, User } = require('../sequelize');
var router = require('express').Router();

// get all trips_users
router.get('/trips_users', (req, res) => {
  console.log(req);
  TripUser.findAll({
    include: [{ model: Trip }, { model: User }]
  }).then(trips_users => res.json(trips_users));
});

// get trip_user by id
router.get('/trips_users/:id', (req, res) => {
  TripUser.findByPk(req.params.id, {
    include: [{ model: Trip }, { model: User }]
  })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'trip_user not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a trip_user
router.post('/trips_users', (req, res) => {
  console.log(req.body);
  TripUser.create(req.body)
    .then(trip_user => res.json(trip_user))
    .catch(err => res.status(409).json(err));
});

// modify trip_user
router.put('/trips_users/:id', (req, res) =>
  TripUser.update(
    {
      tripId: req.body.tripId,
      userId: req.body.userId,
      role: req.body.role
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

// delete trip_user
router.delete('/trips_users/:id', (req, res) =>
  TripUser.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(trip_user => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

// delete trip_user by trip
router.delete('/trips_users/deleteByTrip/:id', (req, res) =>
  TripUser.destroy({
    where: {
      tripId: req.params.id
    }
  })
    .then(trip_user => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
