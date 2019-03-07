const dbConfig = require('./db.config');
const log = require('./log.config');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');
const orderModel = require('../models/order.model');
const userModel = require('../models/user.model');

dbConfig.login()
  .then(() => {
    log.info('Login Successfull!!');
    log.info('Syncing');

    productModel.Product.sync();
    productModel.Department.sync();
    productModel.Category.sync();
    productModel.Product_Category.sync();
    productModel.Attribute.sync();
    productModel.Attribute_Value.sync();
    productModel.Product_Attribute.sync();
    productModel.Review.sync();

    cartModel.Shopping_Cart.sync();

    orderModel.Audit.sync();
    orderModel.Order_Detail.sync();
    orderModel.Orders.sync();
    orderModel.Shipping.sync();
    orderModel.Shipping_Region.sync();
    orderModel.Tax.sync();

    userModel.User.sync({ force: true });
  })
  .catch((err) => {
    log.info(err);
  });
