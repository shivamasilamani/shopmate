const productModel = require('../models/product.model');
const crudUtil = require('../utils/crud.util');

module.exports = {
  getDepartments: async (req, res) => {
    if (req) {
      try {
        const departments = await crudUtil.getAll(productModel.Department, req.query);
        res.status(200);
        res.json({
          departments: departments.rows,
          count: departments.count,
        });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  getDepartmentDetail: async (req, res) => {
    if (req) {
      try {
        const department = await crudUtil.getOne(productModel.Department, req.params.id);
        res.status(200);
        res.json({ department });
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  createDepartment: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        await crudUtil.create(productModel.Department, payload);
        res.status(201);
        res.send('Created');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  updateDepartment: async (req, res) => {
    if (req) {
      try {
        const payload = req.body;
        const whereOption = {
          department_id: req.params.id,
        };
        await crudUtil.update(productModel.Department, payload, whereOption);
        res.status(204);
        res.send('Updated');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  deleteDepartment: async (req, res) => {
    if (req) {
      try {
        if (!req.params.id) {
          throw new Error('Bad Request');
        }
        const whereOption = {
          department_id: req.params.id,
        };
        await crudUtil.delete(productModel.Department, whereOption);
        res.status(204);
        res.send('Deleted');
      } catch (err) {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
};
