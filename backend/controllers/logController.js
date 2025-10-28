const Log = require("../models/Log");

exports.submitLog = async (req, res) => {
    const {participant, studyId, logX, logY, isPostIntervention, comment} = req.body;

    // add some validation later

    try {

        const dailyLog = new Log({
            participant: participant || 'TestUser',
            studyId: studyId,
            logX,
            logY,
            isPostIntervention,
            comment: comment || '',
        });
        await dailyLog.save();

        res.status(201).json({dailyLog});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'server error'});
    }
};