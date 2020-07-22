module.exports = (sequelize, type) => {
  return sequelize.define('user', {
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
    cellphoneNumber: {
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
    },
    withDrivingLicense: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  });
};
