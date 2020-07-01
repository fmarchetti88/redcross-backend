const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
var cors = require('cors');
const { User } = require('./sequelize');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors());
app.use(bodyParser.json());
app.use(require('./routes_no_auth'));

app.use(basicAuth({ authorizer: myAuthorizer, authorizeAsync: true }));
async function myAuthorizer(username, password, cb) {
  const user = await User.findOne({ where: { username, password } });
  return cb(null, !!user);
}

app.use(require('./routes'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;
