// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.showLogin);    // function reference
router.post('/login', authController.loginUser);   // function reference
router.get('/logout', authController.logoutUser);  // function reference

module.exports = router;
