const express = require('express');
const router = express.Router();
const { getAllArtists } = require('../controllers/artistController');

router.get('/', getAllArtists);

module.exports = router;
