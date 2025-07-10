const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Clinician = require('./Clinician');
const Patient = require('./Patient');

const Visit = sequelize.define('Visit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
  },
});

Visit.belongsTo(Clinician, { foreignKey: 'clinicianId' });
Clinician.hasMany(Visit, { foreignKey: 'clinicianId' });

Visit.belongsTo(Patient, { foreignKey: 'patientId' });
Patient.hasMany(Visit, { foreignKey: 'patientId' });

module.exports = Visit;