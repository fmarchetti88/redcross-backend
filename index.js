const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const { User } = require('./sequelize');

const app = express();
app.use(bodyParser.json());
app.use(basicAuth({ authorizer: myAuthorizer, authorizeAsync: true }));

async function myAuthorizer(username, password, cb) {
  const user = await User.findOne({ where: { username, password } });
  return cb(null, !!user);
}

app.use(require('./routes'));
app.get('/api/authenticate', (req, res) =>
  res.status(200).json({
    authenticated: true
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;
