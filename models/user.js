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
      type: type.DATE,
      allowNull: true
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
