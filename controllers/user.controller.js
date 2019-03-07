const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const config = require('../config');
const crudUtil = require('../utils/crud.util');
const msgUtil = require('../utils/message.util');

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401);
      res.send('Unauthorized');
    }
  },
  signup: async (req, res) => {
    try {
      const option = { email: req.body.email };
      const user = await crudUtil.getOne(userModel.User, option);
      if (user) {
        res.status(msgUtil.error_409.status);
        res.json(msgUtil.error_409.error);
      }
    } catch (err) {
      if (err.status === 404) {
        const newUser = userModel.User.build({
          email: req.body.email,
        });
        newUser.setHashAndSalt(req.body.password);
        newUser.save()
          .then(() => {
            res.status(201);
            res.send('Created');
          })
          .catch(() => {
            res.status(msgUtil.error_500.status);
            res.send(msgUtil.error_500.error);
          });
      } else {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  login: (req, res) => {
    if (req.user) {
      const jwtObject = {
        email: req.user.email,
        name: req.user.name,
      };
      const token = jwt.sign(jwtObject, config.JWT_SECRET, { expiresIn: '12h' });
      res.json({
        access_token: token,
        expires_in_seconds: 12 * 60 * 60,
      });
    } else {
      res.status(msgUtil.error_400.status);
      res.send(msgUtil.error_400.error);
    }
  },
  logout: (req, res) => {
    if (req) {
      req.logout();
      res.json({ data: 'Logged Out!' });
    }
  },
};
