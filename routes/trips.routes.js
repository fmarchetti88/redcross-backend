const { Committee, Trip, TripUser, User, Vehicle } = require('../sequelize');
const { authJwt } = require('../middlewares');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var router = require('express').Router();

const includeModel = {
  include: [
    { model: Committee },
    { model: Vehicle },
    {
      model: TripUser,
      include: [User]
    }
  ]
};

// get all trips
router.get('/trips', [authJwt.verifyToken], (req, res) => {
  Trip.findAll(includeModel).then((trips) => res.json(trips));
});

// get booked trips
router.get('/trips/booked', [authJwt.verifyToken], (req, res) => {
  const model = {
    include: [
      { model: Committee },
      { model: Vehicle },
      {
        model: TripUser,
        where: {
          userId: req.userId
        },
        include: [User]
      }
    ],
    where: {
      date: {
        [Op.gte]: new Date()
      },
      committeeId: req.committeeId
    }
  };

  Trip.findAll(model)
    .then((resultTrips) => {
      if (!resultTrips) {
        return res.status(404).json({
          error: 'trips not found'
        });
      }
      return res.json(resultTrips);
      /*const myPromises = resultTrips.map((trip) => {
        return TripUser.findAll({
          include: [
            {
              model: User
            }
          ],
          where: {
            tripId: trip.id
          }
        });
      });
      return Promise.all(myPromises).then((trip_users) => {
        if (!trip_users) {
          return res.status(404).json({
            error: 'trip_users not found'
          });
        }
        const newResult = resultTrips.map((trip, index) => {
          const newTrip = {
            ...trip,
            trip_users: trip_users[index]
          };
          return newTrip;
        });
        res.json(newResult);
      });*/
    })
    .catch((err) => res.status(500).json(err));
});

// get available trips of given committee
router.get('/trips/available', [authJwt.verifyToken], (req, res) => {
  const model = {
    include: [
      { model: Committee },
      { model: Vehicle },
      {
        model: TripUser,
        required: false,
        include: [User]
      }
    ],
    where: {
      date: {
        [Op.gte]: new Date()
      },
      committeeId: req.committeeId,
      [Op.or]: {
        '$trip_users.userId$': null,
        [Op.or]: {
          '$trip_users.userId$': {
            [Op.ne]: req.userId
          }
        }
      }
    }
  };

  Trip.findAll(model)
    .then((resultTrips) => {
      if (!resultTrips) {
        return res.status(404).json({
          error: 'trips not found'
        });
      }
      return res.json(resultTrips);
    })
    .catch((err) => res.status(500).json(err));
});

// get trip
router.get('/trips/:id', [authJwt.verifyToken], (req, res) => {
  Trip.findByPk(req.params.id, includeModel)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'trip not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// create a trip
router.post('/trips', [authJwt.verifyToken], (req, res) => {
  Trip.create(req.body)
    .then((trip) => res.json(trip))
    .catch((err) => res.status(409).json(err));
});

// get trips by committee
router.get('/trips/findByCommittee/:committeeId', [authJwt.verifyToken], (req, res) => {
  Trip.findAll({
    ...includeModel,
    where: { committeeId: req.params.committeeId }
  })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          error: 'trips not found'
        });
      }
      return res.json(result);
    })
    .catch((err) => res.status(500).json(err));
});

// modify trip
router.put('/trips/:id', [authJwt.verifyToken], (req, res) =>
  Trip.update(
    {
      date: req.body.date,
      hour: req.body.hour,
      flgDestination: req.body.flgDestination,
      flgAr: req.body.flgAr,
      siteDeparture: req.body.siteDeparture,
      siteArrival: req.body.siteArrival,
      serviceType: req.body.serviceType,
      patientData: req.body.patientData,
      type: req.body.type,
      extraUsers: req.body.extraUsers,
      flgNurse: req.body.flgNurse,
      flgToNotify: req.body.flgToNotify,
      notes: req.body.notes,
      committeeId: req.body.committeeId,
      vehicleId: req.body.vehicleId
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

router.delete('/trips/:id', [authJwt.verifyToken], (req, res) =>
  Trip.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((trip) => res.status(200).json({}))
    .catch((err) => res.status(409).json(err))
);

module.exports = router;
