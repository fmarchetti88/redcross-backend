module.exports = (sequelize, type) => {
  return sequelize.define('committee_user', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    committeeId: {
      type: type.INTEGER,
      references: {
        model: 'committees',
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
    },
    occupation: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    },
    disabled: {
      type: type.DECIMAL(1, 0),
      allowNull: false,
      defaultValue: 0
    }
  });
};
