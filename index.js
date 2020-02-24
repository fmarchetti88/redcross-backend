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
  const user = await findUser(username, password);
  return cb(null, !!user);
}

function findUser(username, password) {
  let salt = BCrypt.genSaltSync();
  let encPassword = BCrypt.hashSync(password, salt);  
  return User.findOne({ where: { username, encPassword }});
}

app.use(require('./routes'));

const port = 3001;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;
