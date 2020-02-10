const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
var cors = require('cors');
const { User } = require('./sequelize');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(require('./routes_no_auth'));

app.use(basicAuth({ authorizer: myAuthorizer, authorizeAsync: true }));
async function myAuthorizer(username, password, cb) {
  const user = await User.findOne({ where: { username, password } });
  return cb(null, !!user);
}

app.use(require('./routes'));

const port = 3001;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;
