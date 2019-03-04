const cartModel = require('../models/cart.model');
const log = require('../config/log.config');

module.exports = {
  addProductToCart: (req, res) => {
    if (req) {
      const cartItem = JSON.parse(req.body);
      cartModel.create(cartItem)
        .then((item, created) => {
          if (created) {
            res.status(201);
            res.send('Created');
          }
        })
        .catch((err) => {
          log.error(JSON.stringify(err));
        });
    }
  },
};
