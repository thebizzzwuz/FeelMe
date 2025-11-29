const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

// Get all study names
router.get('/names', studyController.getAllStudyNames);

// Download all data for specific study
router.get('/:studyId/download', studyController.downloadStudyData);

module.exports = router;
console.log("Study routes loaded");
// Route to create a new study
router.post('/create',studyController.createStudy);

module.exports = router;
