const express = require('express');
const passport = require('passport');
const userController = require('../controllers/user.controller');

const route = express.Router();

route.post('/signup', (req, res) => {
  userController.signup(req, res);
});

route.post('/login', passport.authenticate('local'), (req, res) => {
  userController.login(req, res);
});

route.post('/logout', userController.isLoggedIn, (req, res) => {
  userController.logout(req, res);
});

module.exports = route;
