const userModel = require('../models/user.model');
const crudUtil = require('../utils/crud.util');
const errorUtil = require('../utils/error.util');

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
        res.status(errorUtil.error_409.status);
        res.json(errorUtil.error_409.error);
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
            res.status(errorUtil.error_500.status);
            res.send(errorUtil.error_500.error);
          });
      } else {
        res.status(err.status);
        res.json(err.error);
      }
    }
  },
  login: (req, res) => {
    if (req) {
      res.status(200);
      res.json({ data: 'Login successfull!' });
    }
  },
  logout: (req, res) => {
    if (req) {
      req.logout();
      res.json({ data: 'Logged Out!' });
    }
  },
};
