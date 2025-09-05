// routes/pageRoutes.js
const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// Routes
router.get('/index', pageController.showIndex);             // Main Dashboard
router.get('/UDashboard', pageController.showUserDashboard); // User Dashboard


module.exports = router;
