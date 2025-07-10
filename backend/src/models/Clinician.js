const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Clinician = sequelize.define('Clinician', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Clinician;