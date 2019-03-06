const productModel = require('../models/product.model');
const crudUtil = require('../utils/crud.util');

module.exports = {
  getProducts: async (req, res) => {
    if (req) {
      try {
        const products = await crudUtil.getAll(productModel.Product, req.query);
        res.status(200);
        res.json({
          products: products.rows,
          count: products.count,
        });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  getProductDetail: async (req, res) => {
    if (req) {
      try {
        const product = await crudUtil.getById(productModel.Product, req.params.id);
        res.status(200);
        res.json({ Product: product });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  createProduct: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        await crudUtil.create(productModel.Product, payload);
        res.status(201);
        res.send('Created');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  updateProduct: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        const whereOption = {
          product_id: req.params.id,
        };
        await crudUtil.update(productModel.Product, payload, whereOption);
        res.status(204);
        res.send('Updated');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  deleteProduct: async (req, res) => {
    if (req) {
      try {
        if (!req.params.id) {
          const error = {
            status: 400,
            error: {
              message: 'Bad Request',
            },
          };
          throw new Error(error);
        }
        const whereOption = {
          product_id: req.params.id,
        };
        await crudUtil.delete(productModel.Product, whereOption);
        res.status(204);
        res.send('Deleted');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
};
