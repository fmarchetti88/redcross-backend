const config = require('../config/auth.config');
const { User, CommitteeUser } = require('../sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    name: req.body.name,
    surname: req.body.surname
  })
    .then((user) => {
      if (user) {
        res.status(200).send({ message: 'User was registered successfully!' });
      } else {
        res.status(404).send({ message: 'Error creating user!' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  const { username, password, committeeId } = req.body;
  if (!username) {
    return res.status(400).send({ message: 'Utente non specificato' });
  }
  if (!password) {
    return res.status(400).send({ message: 'Password non specificata' });
  }
  if (!committeeId) {
    return res.status(400).send({ message: 'Comitato non specificato' });
  }

  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Utente inesistente' });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Password non valida'
        });
      }

      CommitteeUser.findOne({
        where: {
          userId: user.id,
          committeeId
        }
      }).then((committeeUser) => {
        if (!committeeUser || committeeUser.disabled === 1) {
          return res.status(404).send({ message: 'Utente non abilitato al comitato selezionato' });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 315569520 // 10 years
        });

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          committeeId,
          accessToken: token
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
