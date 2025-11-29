const Log = require("../models/Log");

/**
 * Submits a new daily log entry.
 */
exports.submitLog = async (req, res) => {
    try {
        const {participant, studyId, logX, logY, isPostIntervention, comment} = req.body;

        // Validation checks
        if (!studyId){
            return res.status(400).json({ error: 'studyId is required'});
        }
        
        // Matches schema: min: 0, max: 10
        if(typeof logX !== "number" || logX < 0 || logX > 10){
            return res.status(400).json({ error: 'logX must be a number between 0 and 10.'});
        }
        
        // Matches schema: min: 0, max: 10
        if(typeof logY !== "number" || logY < 0 || logY > 10){
            return res.status(400).json({ error: 'logY must be a number between 0 and 10.'});
        }
        
        // Mongoose model handles required:true and default:false, 
        // we only check if the provided value is the correct type if present.
        if(typeof isPostIntervention !== "undefined" && typeof isPostIntervention !== "boolean"){
            return res.status(400).json({ error: 'isPostIntervention must be boolean'});
        }

        const dailyLog = new Log({
            // participant type in schema is Number (for testing)
            participant: participant,
            studyId: studyId,
            logX,
            logY,
            isPostIntervention,
            comment: comment || '',
        });
        
        await dailyLog.save();

        res.status(201).json({dailyLog});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'server error'});
    }
};

/**
 * retrieves aggregated daily progress data (LogX and LogY) for specified participant number
 */
exports.getParticipantProgress = async (req, res) => {
    try {
        const participantIdParam = req.params.participantId; 

        if (!participantIdParam) {
            return res.status(400).json({ error: 'Participant ID is required.' });
        }
        
        // CRUCIAL: Schema participant is type Number, so we must cast the string param
        const participantId = Number(participantIdParam);
        if (isNaN(participantId)) {
             return res.status(400).json({ error: 'Participant ID must be a valid number matching schema.' });
        }


        const progressData = await Log.aggregate([
            { 
                // Use the Number type for matching against the schema's participant field
                $match: { participant: participantId } 
            },
            
            {
                $group: {
                    _id: { 
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } 
                    },
                    avgLogX: { $avg: "$logX" }, 
                    avgLogY: { $avg: "$logY" },
                    dayDate: { $first: "$createdAt" } 
                }
            },
            
            { 
                $sort: { "_id": 1 }
            },

            {
                $project: {
                    _id: 0, 
                    date: "$dayDate", 
                    stress: { $round: ["$avgLogX", 1] }, 
                    wellBeing: { $round: ["$avgLogY", 1] }, 
                }
            }
        ]);

        res.status(200).json(progressData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve progress data' });
    }
};


/**
 * Deletes all logs associated with a participant.
 */
exports.deleteLogsByParticipant = async (req, res) => {
    try {
        const {participantId} = req.body; 
        const result = await Log.deleteMany({participant: participantId});
        res.status(200).json({message: 'Logs deleted!', deletedCount: result.deletedCount});
    } catch (error) {
        res.status(500).json({error: 'Failed to delete logs'});
    }
};