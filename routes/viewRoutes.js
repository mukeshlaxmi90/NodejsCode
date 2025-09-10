const express = require('express');
const router = express.Router();
const entryController = require('../controllers/viewcontroller');
// DataView page render
router.get("/dataview", entryController.showDataView);

module.exports = router;