const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');


router.get('/entryform', entryController.showEntryForm);
router.post('/save', entryController.saveUser);




module.exports = router;
