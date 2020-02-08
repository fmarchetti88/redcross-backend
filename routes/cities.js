const { City, Country } = require('../sequelize');
var router = require('express').Router();

const includeModels = {
  include: [{ model: Country }]
};

// get all cities
router.get('/cities', (req, res) => {
  console.log(req);
  City.findAll(includeModels).then(cities => res.json(cities));
});

// get city
router.get('/cities/:id', (req, res) => {
  City.findByPk(req.params.id, includeModels)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'city not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a city
router.post('/cities', (req, res) => {
  console.log(req.body);
  City.create(req.body)
    .then(city => res.json(city))
    .catch(err => res.status(409).json(err));
});

// modify city
router.put('/cities/:id', (req, res) =>
  City.update(
    {
      description: req.body.description,
      countryId: req.body.countryId
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

router.delete('/cities/:id', (req, res) =>
  City.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(city => res.status(200).json({}))
    .catch(err => req.status(409).json(err))
);

module.exports = router;
