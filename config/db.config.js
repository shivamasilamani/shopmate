const Sequelize = require('sequelize');
const log = require('./log.config');

const options = {
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

if (process.env.NODE_ENV === 'production') {
  options.dialectOptions = {
    socketPath: '/cloudsql/shopmate:us-west1:shopmate',
  };
} else {
  options.host = '35.230.60.71';
  options.port = '3306';
}
const sequelize = new Sequelize('products', 'msiv', 'bJTvqPFzqV6pq2i', options);

sequelize
  .authenticate()
  .then(() => {
    log.info('Connection has been established successfully.');
  })
  .catch((err) => {
    log.error('Connection to database failed:', err);
  });

module.exports = {
  dbInstance: sequelize,
};
