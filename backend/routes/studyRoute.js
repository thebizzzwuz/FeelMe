const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const theStudies = require('../models/study')


// Get all study names
router.get('/names', studyController.getAllStudyNames);

// Route to create a new study
router.post('/create',studyController.createStudy);

//Get the name of a study route
router.get('/studyname', async (req, res) =>{

// Get and return study names

    try {
        const studyNames = await theStudies.find({}, 'studyName');
        res.json(studyNames);
    }

        //Error Handling

    catch(err) {
        if (res.status === 500){
            res.status(500).json({error: err.message});
        }
    }
})

// Download all data for specific study
router.get('/:studyId/download', studyController.downloadStudyData);

module.exports = router;
