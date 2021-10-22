const express = require('express');
const { validate } = require('./validation');
const router = express.Router();
const { errorHandler } = require('./custom-error-handler');
const { read, select_employee_based_on_condition } = require('./controller');

router.get('/read',read,errorHandler);
router.get('/condition',select_employee_based_on_condition,errorHandler);

module.exports = router;