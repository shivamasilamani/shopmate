const express = require('express');
const productController = require('../controllers/product.controller');

const route = express.Router();

route.get('/', (req, res) => {
  productController.getItems(req, res);
});

route.get('/:id', (req, res) => {
  productController.getItemDetail(req, res);
});

module.exports = route;
