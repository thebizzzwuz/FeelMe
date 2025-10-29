const Log = require("../models/Log");

exports.submitLog = async (req, res) => {
    try {
        const {studyId, logX, logY, isPostIntervention, comment} = req.body;

        // Validation checks
        if (!studyId){
            return res.status(400).json({ error: 'studyId is required'});
        }
        if(typeof logX !== "number" || logX < 0 || logX > 10){
            return res.status(400).json({ error: 'logX must be a number between 0 and 10.'});
        }
        if(typeof logY !== "number" || logY < 0 || logY > 10){
            return res.status(400).json({ error: 'logY must be a number between 0 and 10.'});
        }
        if(typeof isPostIntervention !== "undefined" && typeof isPostIntervention !== "boolean"){
            return res.status(400).json({ error: 'isPostIntervention must be boolean'});
        }

        const dailyLog = new Log({
            // req.user._id comes from the 'protect' middleware. Need it to link the new log to the authenticated
            // participant.
            participant: req.user._id,
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