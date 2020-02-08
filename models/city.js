module.exports = (sequelize, type) => {
  return sequelize.define('city', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: type.STRING,
      allowNull: false
    },
    countryId: {
      type: type.INTEGER,
      references: {
        model: 'countries',
        key: 'id'
      },
      allowNull: false
    }
  });
};
