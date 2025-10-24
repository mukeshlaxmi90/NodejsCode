const express = require('express');
const router = express.Router();
const simController = require('../controllers/SimpleintController');
// DataView page render
router.get("/Simpleintrest", simController.showsimpview);
module.exports = router;