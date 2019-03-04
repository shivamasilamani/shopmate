const express = require('express');

const route = express.Router();

route.get('/items', (req, res) => {
  if (req) {
    res.send('Items');
  }
});

module.exports = route;
