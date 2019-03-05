const productModel = require('../models/product.model');
const crudUtil = require('../utils/crud.util');

module.exports = {
  getCategories: async (req, res) => {
    if (req) {
      try {
        const categories = await crudUtil.getAll(productModel.Category, req.query);
        res.status(200);
        res.json({
          categories: categories.rows,
          count: categories.count,
        });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  getCategoryDetail: async (req, res) => {
    if (req) {
      try {
        const category = await crudUtil.getOne(productModel.Category, req.params.id);
        res.status(200);
        res.json({ category });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  createCategory: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        await crudUtil.create(productModel.Category, payload);
        res.status(201);
        res.send('Created');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  updateCategory: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        const whereOption = {
          category_id: req.params.id,
        };
        await crudUtil.update(productModel.Category, payload, whereOption);
        res.status(204);
        res.send('Updated');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  deleteCategory: async (req, res) => {
    if (req) {
      try {
        if (!req.params.id) {
          throw new Error('Bad Request');
        }
        const whereOption = {
          category_id: req.params.id,
        };
        await crudUtil.delete(productModel.Category, whereOption);
        res.status(204);
        res.send('Deleted');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
};
