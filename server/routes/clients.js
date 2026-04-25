const express = require('express');
const router = express.Router();
const { getAllClients } = require('../controllers/clientController');

router.get('/', getAllClients);

module.exports = router;
