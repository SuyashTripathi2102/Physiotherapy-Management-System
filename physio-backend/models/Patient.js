const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  doctor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  subscription_start: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  subscription_end: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  medical_history: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isActive : {
    type: DataTypes.BOOLEAN,
    defaultValue : true,
  }
}, {
  tableName: 'patients',
  timestamps: true
});

module.exports = Patient;
