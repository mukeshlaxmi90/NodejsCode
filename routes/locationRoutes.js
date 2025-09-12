const express = require('express');
const router = express.Router();
const saveLocationController = require('../controllers/locationController');

// API endpoint
router.post("/save-location", saveLocationController);

module.exports = router;
