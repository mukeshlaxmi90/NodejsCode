const express = require('express');
const router = express.Router();
const sipController = require('../controllers/SipcalController');
// DataView page render
router.get("/SIPCalcuation", sipController.showsipview);
module.exports = router;