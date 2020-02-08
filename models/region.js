module.exports = (sequelize, type) => {
  return sequelize.define('region', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: type.STRING,
      allowNull: false,
      unique: true
    }
  });
};
