const items = require('../src/items/routes');

module.exports = (app) => {
  app.use('/items', items);
  app.use('*', (req, res) => {
    res.send('404 page not found!');
  });
};