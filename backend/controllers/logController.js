const Log = require("../models/Log");
const { Parser } = require('json2csv'); // for CSV export, need to install json2csv


/**
 * Submits a new daily log entry.
 */
exports.submitLog = async (req, res) => {
    console.log("Request body:", req.body); // ADD THIS
    try {
        const {studyId, logX, logY, isPostIntervention, comment} = req.body;

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
        console.error(error);
        res.status(500).json({error: 'server error'});
    }
};

// Returns participants logs in Jason Format (this is for charts)
exports.getPreInterventionLogs = async (req, res) => {
    try {
        const participantId = req.user._id; // comes from JWT

        const logs = await Log.find({participant: participantId, isPostIntervention:false})
            .sort({createdAt: 1});
        return res.status(200).json({logs});
    } catch (error) {
        console.log("error fetching logs", error);
        res.status(500).json({error: 'server error'});
    }
};

// Returns participants post logs in Jason Format (this is for charts)
exports.getPostInterventionLogs = async (req, res) => {
    try {
        const participantId = req.user._id; // comes from JWT

        const logs = await Log.find({participant: participantId, isPostIntervention:true})
            .sort({createdAt: 1});
        return res.status(200).json({logs});
    } catch (error) {
        console.log("error fetching logs", error);
        res.status(500).json({error: 'server error'});
    }
};


// Download all logs for a given participant as CSV
exports.downloadParticipantLogs = async (req, res) => {
    try {
        const participantId  = req.user._id

        // Find all logs belonging to this participant
        const logs = await Log.find({ participant: participantId })
            .sort({ createdAt: 1 });

        if (!logs.length) {
            return res.status(404).json({ error: 'No logs found for this participant' });
        }

        // Labels and mapping for CSV fields
        const fields = [
            { label: 'Participant ID', value: 'participant' },
            { label: 'Study ID', value: 'studyId' },
            { label: 'logX', value: 'logX' },
            { label: 'logY', value: 'logY' },
            { label: 'Post Intervention', value: 'isPostIntervention' },
            { label: 'Comment', value: 'comment' },
            { label: 'Created At', value: 'createdAt' }
        ];

        const json2csv = new Parser({ fields });
        const csv = json2csv.parse(logs);

        // Send CSV file
        res.header('Content-Type', 'text/csv');
        res.attachment(`participant_${participantId}_logs.csv`);
        return res.send(csv);

    } catch (error) {
        console.error('Error generating participant data:', error);
        res.status(500).json({ error: 'Server error generating participant data' });
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