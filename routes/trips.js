const { Committee, Trip, TripUser, User, Vehicle } = require('../sequelize');
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
router.get('/trips', (req, res) => {
  console.log(req);
  Trip.findAll(includeModel).then(trips => res.json(trips));
});

// get trip
router.get('/trips/:id', (req, res) => {
  Trip.findByPk(req.params.id, includeModel)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'trip not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a trip
router.post('/trips', (req, res) => {
  console.log(req.body);
  Trip.create(req.body)
    .then(trip => res.json(trip))
    .catch(err => res.status(409).json(err));
});

// get trips by committee
router.get('/trips/findByCommittee/:committeeId', (req, res) => {
  Trip.findAll({
    ...includeModel,
    where: { committeeId: req.params.committeeId }
  })
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'trips not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// modify trip
router.put('/trips/:id', (req, res) =>
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
    .then(result => res.json(result))
    .catch(err => req.status(409).json(err))
);

router.delete('/trips/:id', (req, res) =>
  Trip.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(trip => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
