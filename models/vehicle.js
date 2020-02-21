module.exports = (sequelize, type) => {
  return sequelize.define('vehicle', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: type.INTEGER,
      allowNull: false
    },
    plate: {
      type: type.STRING
    },
    sign: {
      type: type.STRING
    },
    description: {
      type: type.STRING
    },
    committeeId: {
      type: type.INTEGER,
      references: {
        model: 'committees',
        key: 'id'
      },
      allowNull: false
    }
  });
};
