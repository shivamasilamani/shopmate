const op = require('sequelize').Op;
const productModel = require('../models/product.model');
const log = require('../config/log.config');

module.exports = {
  getItems: (req, res) => {
    if (req) {
      const options = {};
      if (req.query.skip && req.query.top) {
        options.offset = parseInt(req.query.skip, 10);
        options.limit = parseInt(req.query.top, 10);
      }
      if (req.query.search) {
        options.where = {
          name: {
            [op.like]: `%${req.query.search}%`,
          },
          description: {
            [op.like]: `%${req.query.search}%`,
          },
        };
      }
      productModel.Product.findAndCountAll(options)
        .then((products) => {
          res.json({
            Product: products.rows,
            Count: products.count,
          });
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
        });
    }
  },
  getItemDetail: (req, res) => {
    if (req) {
      productModel.Product.findByPk(req.params.id)
        .then((product) => {
          res.json({ Product: product });
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
        });
    }
  },
};
