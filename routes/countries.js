const { Country, Region } = require('../sequelize');
var router = require('express').Router();

const includeModels = {
  include: [{ model: Region }]
};

// get all countries
router.get('/countries', (req, res) => {
  console.log(req);
  Country.findAll(includeModels).then(countries => res.json(countries));
});

// get country
router.get('/countries/:id', (req, res) => {
  Country.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'country not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a country
router.post('/countries', (req, res) => {
  console.log(req.body);
  Country.create(req.body)
    .then(country => res.json(country))
    .catch(err => res.status(409).json(err));
});

// modify country
router.put('/countries/:id', (req, res) =>
  Country.update(
    {
      description: req.body.description,
      regionId: req.body.regionId
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

router.delete('/countries/:id', (req, res) =>
  Country.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(country => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
