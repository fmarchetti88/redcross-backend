const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const basicAuth = require('express-basic-auth');
var cors = require('cors');
// const { User } = require('./sequelize');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes_no_auth'));

/*app.use(basicAuth({ authorizer: myAuthorizer, authorizeAsync: true }));
async function myAuthorizer(username, password, cb) {
  const user = await User.findOne({ where: { username, password } });
  return cb(null, !!user);
}*/

app.use(require('./routes'));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
