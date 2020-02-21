module.exports = (sequelize, type) => {
  return sequelize.define('trip', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: type.DATEONLY,
      allowNull: false,
      unique: 'uniqueTrip'
    },
    hour: {
      type: type.TIME,
      allowNull: false,
      unique: 'uniqueTrip'
    },
    flgDestination: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: 'uniqueTrip'
    },
    flgAr: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0,
      unique: 'uniqueTrip'
    },
    siteDeparture: {
      type: type.STRING,
      allowNull: false,
      unique: 'uniqueTrip'
    },
    siteArrival: {
      type: type.STRING,
      allowNull: false,
      unique: 'uniqueTrip'
    },
    serviceType: {
      type: type.STRING,
      allowNull: false
    },
    patientData: {
      type: type.STRING
    },
    type: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    extraUsers: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    flgNurse: {
      type: type.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notes: {
      type: type.STRING(1234)
    },
    committeeId: {
      type: type.INTEGER,
      references: {
        model: 'committees',
        key: 'id'
      },
      allowNull: false
    },
    vehicleId: {
      type: type.INTEGER,
      references: {
        model: 'vehicles',
        key: 'id'
      },
      allowNull: false
    }
  });
};
