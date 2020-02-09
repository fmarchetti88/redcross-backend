module.exports = (sequelize, type) => {
  return sequelize.define('trip_user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tripId: {
      type: type.INTEGER,
      references: {
        model: 'trips',
        key: 'id'
      },
      allowNull: false
    },
    userId: {
      type: type.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      allowNull: false
    },
    role: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    }
  });
};
