const { Region } = require('./../sequelize');
var router = require('express').Router();

// get all regions
router.get('/regions', (req, res) => {
  console.log(req);
  Region.findAll().then(regions => res.json(regions));
});

// get region
router.get('/regions/:id', (req, res) => {
  Region.findByPk(req.params.id)
    .then(result => {
      if (!result) {
        return res.status(404).json({
          error: 'region not found'
        });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json(err));
});

// create a region
router.post('/regions', (req, res) => {
  console.log(req.body);
  Region.create(req.body)
    .then(region => res.json(region))
    .catch(err => res.status(409).json(err));
});

// modify region
router.put('/regions/:id', (req, res) =>
  Region.update(
    {
      description: req.body.description
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

router.delete('/regions/:id', (req, res) =>
  Region.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(region => res.status(200).json({}))
    .catch(err => res.status(409).json(err))
);

module.exports = router;
