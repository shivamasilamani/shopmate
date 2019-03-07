const Sequelize = require('sequelize');
const log = require('./log.config');
const config = require('../config.json');

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

let username = '';
let password = '';
let database = '';

if (process.env.NODE_ENV === 'production') {
  options.dialectOptions = {
    socketPath: config.MYSQL_SOCKET_PATH,
  };
  username = config.MYSQL_USER;
  password = config.MYSQL_PASSWORD;
  database = config.MYSQL_DATABASE;
} else {
  options.host = config.MYSQL_HOST;
  options.port = config.MYSQL_PORT;
  username = config.MYSQL_LOCAL_USER;
  password = config.MYSQL_LOCAL_PASSWORD;
  database = config.MYSQL_DATABASE;
}
const sequelize = new Sequelize(
  database,
  username,
  password,
  options,
);

module.exports = {
  login: () => {
    const promise = new Promise((resolve, reject) => {
      sequelize
        .authenticate()
        .then(() => {
          const msg = 'Database connection has been established successfully!';
          log.info(msg);
          resolve();
        })
        .catch((err) => {
          const msg = 'Database connection failed!';
          log.error(msg, err);
          reject(new Error(msg));
        });
    });
    return promise;
  },
  dbInstance: sequelize,
};
