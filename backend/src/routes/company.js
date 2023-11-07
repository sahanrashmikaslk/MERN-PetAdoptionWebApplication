const express = require('express');

const router = express.Router();
const CompanyController = require('../controllers/admin');

router.post('/', CompanyController.register);
router.post('/login', CompanyController.login);

module.exports = router;