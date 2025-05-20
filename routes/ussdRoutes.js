const express = require('express');
const router = express.Router();
const ussdController = require('../controllers/ussdController');

router.post('/ussd', ussdController.handleUSSD);

module.exports = router;
