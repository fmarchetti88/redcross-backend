const BCrypt = require('bcrypt');

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

  function generateHash(user) {
    if (user === null) {
        throw new Error('user not found');
    }
    else if (!user.changed('password')) return user.password; 
    else {
        let salt = BCrypt.genSaltSync();
        return user.password = BCrypt.hashSync(user.password, salt);
    }
  }

  User.beforeCreate(generateHash);
  User.beforeUpdate(generateHash);

  return User;
};