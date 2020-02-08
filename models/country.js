module.exports = (sequelize, type) => {
  return sequelize.define('country', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: type.STRING,
      allowNull: false,
      unique: true
    },
    regionId: {
      type: type.INTEGER,
      references: {
        model: 'regions',
        key: 'id'
      },
      allowNull: false
    }
  });
};
