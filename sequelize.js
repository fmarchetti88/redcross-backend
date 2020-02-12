const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const RegionModel = require('./models/region');
const CountryModel = require('./models/country');
const CityModel = require('./models/city');
const CommitteeModel = require('./models/committee');
const VehicleModel = require('./models/vehicle');
const CommitteeUserModel = require('./models/committee_user');
const TripModel = require('./models/trip');
const TripUserModel = require('./models/trip_user');

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
const CommitteeUser = CommitteeUserModel(sequelize, Sequelize);
const Trip = TripModel(sequelize, Sequelize);
const TripUser = TripUserModel(sequelize, Sequelize);

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
CommitteeUser.belongsTo(Committee);
CommitteeUser.belongsTo(User);
Committee.hasMany(CommitteeUser);
User.hasMany(CommitteeUser);
Trip.belongsTo(Vehicle);
Trip.belongsTo(Committee);
Vehicle.hasMany(Trip);
Committee.hasMany(Trip);
TripUser.belongsTo(Trip);
TripUser.belongsTo(User);
Trip.hasMany(TripUser);
User.hasMany(TripUser);

sequelize.sync({ force: true }).then(() => {
  Region.create({
    description: 'Marche'
  });
  Country.create({
    description: 'Pesaro/Urbino',
    acronym: 'PU',
    regionId: 1
  });
  City.create({
    description: 'Cagli',
    countryId: 1
  });
  City.create({
    description: `SantAngelo in Vado`,
    countryId: 1
  });
  Committee.create({
    description: 'Comitato di Cagli',
    cityId: 1,
    countryId: 1,
    regionId: 1
  });
  Committee.create({
    description: `Comitato di SantAngelo in Vado`,
    cityId: 2,
    countryId: 1,
    regionId: 1
  });
  User.create({
    username: 'f.marchetti',
    password: 'default',
    name: 'Filippo',
    surname: 'Marchetti',
    birth_date: new Date(1988, 04, 15),
    gender: 0,
    role: 0,
    type: 0
  });
  User.create({
    username: 'f.torri',
    password: 'default',
    name: 'Filippo',
    surname: 'Torri',
    birth_date: new Date(1960, 02, 11),
    gender: 0,
    role: 0,
    type: 0
  });
  CommitteeUser.create({
    userId: 1,
    committeeId: 1
  });
  CommitteeUser.create({
    userId: 2,
    committeeId: 1
  });
  CommitteeUser.create({
    userId: 2,
    committeeId: 2
  });
  Vehicle.create({
    type: 0,
    plate: 'EA072RJ',
    sign: '51A',
    description: 'Ambulanza 1',
    committeeId: 1
  });
  Vehicle.create({
    type: 1,
    plate: 'EA072AA',
    sign: '50A',
    description: 'Ambulanza 2',
    committeeId: 1
  });
  Vehicle.create({
    type: 1,
    plate: 'DC002GL',
    sign: '52A',
    description: 'Ambulanza 2',
    committeeId: 2
  });
  Trip.create({
    dateHour: new Date(2020, 2, 10, 10, 00),
    flgDestination: 0,
    flgAr: 0,
    siteDeparture: 'via della libertà, 10 - Cagli',
    siteArrival: 'via martiri di via fani, 2 - Acqualagna',
    serviceType: 'Dialisi',
    patientData: 'Marco Rossi',
    type: 0,
    extraUsers: 1,
    flgNurse: 0,
    notes: 'n/a',
    committeeId: 1,
    vehicleId: 1
  });
  TripUser.create({
    userId: 1,
    tripId: 1,
    role: 0
  });
  TripUser.create({
    userId: 2,
    tripId: 1,
    role: 1
  });
  Trip.create({
    dateHour: new Date(2020, 3, 10, 10, 00),
    flgDestination: 0,
    flgAr: 0,
    siteDeparture: 'via della libertà, 11 - Cagli',
    siteArrival: 'via martiri di via fani, 2 - Acqualagna',
    serviceType: 'Dialisi',
    patientData: 'Roberto Bianchi',
    type: 0,
    extraUsers: 0,
    flgNurse: 0,
    notes: 'n/a',
    committeeId: 1,
    vehicleId: 1
  });
  TripUser.create({
    userId: 2,
    tripId: 2,
    role: 1
  });
});

module.exports = {
  User,
  Region,
  Country,
  City,
  Committee,
  Vehicle,
  CommitteeUser,
  Trip,
  TripUser
};
