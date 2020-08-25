const { Trip, TripUser, User } = require('../sequelize');
const { authJwt } = require('../middlewares');
var router = require('express').Router();

// get all trips_users
router.get('/trips_users', [authJwt.verifyToken], (req, res) => {
  console.log(req);
  TripUser.findAll({
    include: [{ model: Trip }, { model: User }]
  }).then((trips_users) => res.json(trips_users));
});

// get trip_user by id
router.get('/trips_users/:id', [authJwt.verifyToken], (req, res) => {
  TripUser.findByPk(req.params.id, {
    include: [{ model: Trip }, { model: User }]
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'trip_user not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// get trip_user by userId
router.get('/trips_users/findByUserId/:userId', [authJwt.verifyToken], (req, res) => {
  TripUser.findAll({
    include: [{ model: Trip }, { model: User }],
    where: { userId: req.params.userId }
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'trip_user not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// create a trip_user
router.post('/trips_users', [authJwt.verifyToken], (req, res) => {
  const tripId = req.body.tripId;
  Trip.findByPk(tripId, {
    include: [
      {
        model: TripUser,
        include: [User]
      }
    ]
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'trip not found'
        });
      }
      const { extraUsers, trip_users } = result;
      if (trip_users !== undefined && trip_users !== null) {
        const { userId } = req.body;
        const tripUser = trip_users.find((element) => element.userId === userId);
        if (tripUser) {
          return res.status(409).json({
            message: `L'utente risulta già prenotato al servizio`
          });
        }
        const maxUsers = extraUsers + 1;
        if (maxUsers === trip_users.length) {
          return res.status(409).json({
            message: `Il servizio non risulta prenotabile perchè raggiunta la capienza massima`
          });
        }
      }
      TripUser.create(req.body)
        .then((trip_user) => res.json(trip_user))
        .catch((err) => res.status(409).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

// modify trip_user
router.put('/trips_users/:id', [authJwt.verifyToken], (req, res) =>
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
    .then((result) => res.json(result))
    .catch((err) => res.status(409).json(err))
);

// delete trip_user
router.delete('/trips_users/:id', [authJwt.verifyToken], (req, res) =>
  TripUser.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((trip_user) => res.status(200).json({}))
    .catch((err) => res.status(409).json(err))
);

// delete trip_user by trip
router.delete('/trips_users/deleteByTrip/:id', [authJwt.verifyToken], (req, res) =>
  TripUser.destroy({
    where: {
      tripId: req.params.id
    }
  })
    .then((trip_user) => res.status(200).json({}))
    .catch((err) => res.status(409).json(err))
);

module.exports = router;
