const express = require('express')
const router = express.Router()
const ParticipantFromStudy = require('../models/participant')


//Get the participants for a single study
router.get('/:study', async (req, res) => {

    // Get and return study participants

    try {
        const {study} = req.params;

        // Searches and finds all participant ids for a certain study
        // console.log("Querying participants for study:", studyName);
        const participants = await ParticipantFromStudy.find({study: study}, 'participantId');

        // If None
        if (participants.length === 0) {
            return res.status(400).json({message: "No participants associated"});
        }
        // console.log("Found participants:", participants);
        res.json(participants)
    }

    //Error Handling
    catch (error) {
        console.error('Error', error);
        res.status(500).json({message: 'Error'})
    }

})

module.exports = router;
