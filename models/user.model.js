const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelizeInstance = dbConfig.dbInstance;

module.exports = {
  Customer: sequelizeInstance.define('customer', {
    customer_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    credit_card: {
      type: Sequelize.TEXT,
    },
    address_1: {
      type: Sequelize.STRING(100),
    },
    address_2: {
      type: Sequelize.STRING(100),
    },
    city: {
      type: Sequelize.STRING(100),
    },
    region: {
      type: Sequelize.STRING(100),
    },
    postal_code: {
      type: Sequelize.STRING(100),
    },
    country: {
      type: Sequelize.STRING(100),
    },
    shioping_region_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    day_phone: {
      type: Sequelize.STRING(100),
    },
    eve_phone: {
      type: Sequelize.STRING(100),
    },
    mob_phone: {
      type: Sequelize.STRING(100),
    },
  },
  {
    timestamps: false,
    tableName: 'customer',
  }),
};
