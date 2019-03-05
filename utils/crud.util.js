const op = require('sequelize').Op;
const log = require('../config/log.config');

module.exports = {
  // Queries a DB table to find all records which match the given conditions
  getAll: (model, query) => {
    const getPromise = new Promise((resolve, reject) => {
      const options = {};
      if (query.skip && query.top) {
        options.offset = parseInt(query.skip, 10);
        options.limit = parseInt(query.top, 10);
      }
      if (query.search) {
        options.where = {
          name: {
            [op.like]: `%${query.search}%`,
          },
          description: {
            [op.like]: `%${query.search}%`,
          },
        };
      }
      model.findAndCountAll(options)
        .then((items) => {
          if (items) {
            resolve(items);
          } else {
            resolve({
              rows: [],
              count: 0,
            });
          }
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          reject(new Error(error));
        });
    });
    return getPromise;
  },
  // Queries a DB table to find one row with the given ID
  getOne: (model, id) => {
    const getOnePromise = new Promise((resolve, reject) => {
      model.findByPk(id)
        .then((item) => {
          if (item) {
            resolve(item);
          } else {
            const error = {
              status: 404,
              error: {
                message: 'Not Found',
              },
            };
            reject(new Error(error));
          }
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          reject(new Error(error));
        });
    });
    return getOnePromise;
  },
  // Creates an entry in DB table with the given payload
  create: (model, payload) => {
    const createPromise = new Promise((resolve, reject) => {
      model.create(payload)
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          reject(new Error(error));
        });
    });
    return createPromise;
  },
  // Updates an entry in DB table with the given payload
  update: (model, payload, whereOption) => {
    const updatePromise = new Promise((resolve, reject) => {
      model.update(payload, { where: whereOption })
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          reject(new Error(error));
        });
    });
    return updatePromise;
  },
  // Deletes an entry from DB table
  delete: (model, whereOption) => {
    const destroyPromise = new Promise((resolve, reject) => {
      model.destroy({ where: whereOption })
        .then((item) => {
          resolve(item);
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          reject(new Error(error));
        });
    });
    return destroyPromise;
  },
};
