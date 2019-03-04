const Sequelize = require('sequelize');
const log = require('./log.config');

const sequelize = new Sequelize('products', 'msiv', 'bJTvqPFzqV6pq2i', {
  host: '35.230.60.71',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

sequelize
  .authenticate()
  .then(() => {
    log.info('Connection has been established successfully.');
  })
  .catch((err) => {
    log.error('Unable to connect to the database:', err);
  });

module.exports = {
  dbInstance: sequelize,
};
