const express = require('express');
const router = express.Router();
const dtainController = require("../controllers/datainsertController");


// datainsert form ko open karne ke liye
router.get("/datainsert", dtainController.showDataInsertForm);


// API से JSON data return
console.log("m5");
//router.get("/users", dtainController.apigetData);
console.log("m6");
module.exports = router