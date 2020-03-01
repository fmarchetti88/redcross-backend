if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { User } = require('./sequelize');

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.use(require('./routes_no_auth'));

app.use(basicAuth({ authorizer: myAuthorizer, authorizeAsync: true }));
async function myAuthorizer(username, password, cb) {
  findUserAsync(username, password,
    (user) => {
      return cb(null, user);
    }, 
    (failure) => {
      return cb(null, false);
    }
  );
}

function findUserAsync(username, password, successCallback, failureCallback) {
  User.findOne({ where: { username }})
    .then(
      (user) => { 
        bcrypt.compare(password, user.password).then((result) => {
          if (result == true) {
            successCallback(user);
          } else {
            failureCallback(null);
          }
        })
      }
    )
    .catch( (err) => { 
      console.log(err); 
      failureCallback(null); 
    } );
}

app.use(require('./routes'));

const port = 3001;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});

module.exports = app;
