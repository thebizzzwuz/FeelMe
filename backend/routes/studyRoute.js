const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

console.log("Study routes loaded");
// Route to create a new study
router.post('/create',studyController.createStudy);

module.exports = router;
