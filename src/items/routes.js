const express = require('express');

const controller = require('./controller/index');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');

const router = express.Router();

router.post(
  '/api/v1/',
  validateSchemas.inputs(schemas.createItem, 'body'),
  (req, res) => {
    controller.createItem(res, req.body);
  }
);

router.patch(
  '/api/v1/',
  validateSchemas.inputs(schemas.editItem, 'body'),
  (req, res) => {
    controller.editItem(res, req.body);
  }
);

router.delete(
  '/api/v1/',
  validateSchemas.inputs(schemas.deleteItem, 'body'),
  (req, res) => {
    controller.deleteItem(res, req.body);
  }
);

router.get(
  '/api/v1/',
  validateSchemas.inputs(schemas.getItem, 'body'),
  (req, res) => {
    controller.getItem(res, req.body);
  }
);

module.exports = router;