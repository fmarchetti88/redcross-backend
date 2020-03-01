const bcrypt = require('bcrypt');

module.exports = (sequelize, type) => {
  const User = sequelize.define('user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: type.STRING,
      allowNull: false
    },
    flgPasswordChanged: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: type.STRING,
      allowNull: false
    },
    surname: {
      type: type.STRING,
      allowNull: false
    },
    birth_date: {
      type: type.DATEONLY,
      allowNull: true
    },
    email: {
      type: type.STRING
    },
    gender: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    superuser: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });

  // function generateHash(user) {
  //   return new Promise((resolve, reject) => {     
  //     if (user === null) {
  //         throw new Error('user not found');
  //     }
  //     else if (!user.changed('password')) return user.password; 
  //     else {
  //         let salt = bcrypt.genSaltSync();
  //         return user.password = bcrypt.hashSync(user.password, salt);
  //     }
  //   })     
  // }
 
  // function generateHash(user, options, cb) {
  //   return new Promise((resolve, reject) => {    
  //     if (user === null) {
  //       reject('user not found');
  //     }
  //     else if (user.changed('password')) {
  //       user.password = await (async function() {
  //         return new Promise((resolve, reject) => {
  //           let salt = bcrypt.genSaltSync();
  //           bcrypt.hashSync(user.password, salt, function(err, hash) {
  //             if (err) reject(err);
  //             resolve(hash);
  //           });
  //         });
  //       });
  //     }
  //     resolve(cb(null, options));
  //   });
  // }

  function generateHash(user, options) {
    let salt = bcrypt.genSaltSync();
    return bcrypt.hash(user.password, salt)
      .then(hash => {
          user.password = hash;
      })
      .catch(err => { 
          throw new Error(); 
      });
  }

  User.beforeCreate(generateHash);
  User.beforeUpdate(generateHash);

  return User;
};