const express = require('express')
const router = express.Router()
const Study = require('../models/studies')

//Create a study route

router.post('/createstudy', async (req, res) =>{

    // Save study to database
    const study  = new Study (req.body);
    const placeStudy = await study.save();

    //Error Handling
    try {
        if (res.status === 200) {
            res.status(200).json(placeStudy);
        }
    }
        catch(err) {
            if (res.status === 500){
                res.status(500).json({error: err.message});
        }
    }
})

//Get the name of a study route
router.get('/studyname', async (req, res) =>{

    // Get and return study names

    try {
        const studyNames = await Study.find({}, 'nameStudy');
        res.json(studyNames);
    }

        //Error Handling

    catch(err) {
        if (res.status === 500){
            res.status(500).json({error: err.message});
        }
    }
})

module.exports = router;



