const { Committee, Region, Country, City } = require('../sequelize');
var router = require('express').Router();

const includeModels = {
  include: [{ model: Region }, { model: Country }, { model: City }]
};

// get all committees
router.get('/committees', (req, res) => {
  console.log(req);
  Committee.findAll(includeModels).then(committees => res.json(committees));
});

// get committee
router.get('/committees/:id', (req, res) => {
  Committee.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'committee not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a committee
router.post('/committees', (req, res) => {
  console.log(req.body);
  Committee.create(req.body)
    .then(committee => res.json(committee))
    .catch(err => res.status(409).json(err));
});

// modify committee
router.put('/committees/:id', (req, res) =>
  Committee.update(
    {
      description: req.body.description,
      regionId: req.body.regionId,
      countryId: req.body.countryId,
      cityId: req.body.cityId
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

router.delete('/committees/:id', (req, res) =>
  Committee.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(committee => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
