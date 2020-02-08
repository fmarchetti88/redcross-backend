module.exports = (sequelize, type) => {
  return sequelize.define('committee', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: type.STRING,
      allowNull: true
    },
    regionId: {
      type: type.INTEGER,
      references: {
        model: 'regions',
        key: 'id'
      },
      allowNull: false
    },
    countryId: {
      type: type.INTEGER,
      references: {
        model: 'countries',
        key: 'id'
      },
      allowNull: false
    },
    cityId: {
      type: type.INTEGER,
      references: {
        model: 'cities',
        key: 'id'
      },
      allowNull: false
    }
  });
};
