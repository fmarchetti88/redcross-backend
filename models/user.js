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
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: type.STRING,
      allowNull: false,
      unique: 'uniqueName'
    },
    surname: {
      type: type.STRING,
      allowNull: false,
      unique: 'uniqueName'
    },
    birth_date: {
      type: type.DATEONLY,
      allowNull: true
    },
    email: {
      type: type.STRING
    },
    gender: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    },
    role: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    },
    occupation: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    }
  });
};
