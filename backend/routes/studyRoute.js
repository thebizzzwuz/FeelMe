const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');

// Route to create a new study
router.post('/create', studyController.createStudy);

router.get('/', (req, res) => {
    res.send('Study route is working!');
});

module.exports = router;
