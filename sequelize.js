const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const RegionModel = require('./models/region');
const CountryModel = require('./models/country');
const CityModel = require('./models/city');
const CommitteeModel = require('./models/committee');
const VehicleModel = require('./models/vehicle');

const sequelize = new Sequelize('redcross', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const User = UserModel(sequelize, Sequelize);
const Region = RegionModel(sequelize, Sequelize);
const Country = CountryModel(sequelize, Sequelize);
const City = CityModel(sequelize, Sequelize);
const Committee = CommitteeModel(sequelize, Sequelize);
const Vehicle = VehicleModel(sequelize, Sequelize);

// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
//const BlogTag = sequelize.define('blog_tag', {});

Country.belongsTo(Region);
Region.hasMany(Country);
City.belongsTo(Country);
Country.hasMany(City);
Committee.belongsTo(Region);
Region.hasMany(Committee);
Committee.belongsTo(Country);
Country.hasMany(Committee);
Committee.belongsTo(City);
City.hasMany(Committee);
Vehicle.belongsTo(Committee);

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  User,
  Region,
  Country,
  City,
  Committee,
  Vehicle
};
