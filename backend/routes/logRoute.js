const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post("/submit-log", logController.submitLog);

module.exports = router;

