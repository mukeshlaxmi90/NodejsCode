const express = require('express');
const router = express.Router();
const dtainController = require("../controllers/datainsertController");


// datainsert form ko open karne ke liye
router.get("/datainsert", dtainController.showDataInsertForm);

module.exports = router