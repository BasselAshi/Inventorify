const express = require('express');
const path = require("path");
const items = require('./src/items/routes');

module.exports = (app) => {
  app.use('/items', items);
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use('*', (req, res) => {
    res.send('404 page not found!');
  });
};