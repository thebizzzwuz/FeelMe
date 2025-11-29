const Study = require('../models/Study');
const Log = require('../models/Log');
const { Parser } = require('json2csv'); // for CSV export, need to install json2csv


// Fetch all study names for dropdown - for "Choose a Study" dropdown
exports.getAllStudyNames = async (req, res) => {
    try {
        // Return only _id and studyName for the dropdown
        const studies = await Study.find({}, 'studyName'); // get study names from MongoDB
        const studyList = studies.map(study => ({
            id: study._id,
            name: study.studyName
        }));

        res.status(200).json({ studies: studyList });
    } catch (error) {
        console.error('Error fetching study names:', error);
        res.status(500).json({ error: 'Error fetching study names' });
    }
};

// Download all logs for a specific study as CSV -- from Admin Dashboard
exports.downloadStudyData = async (req, res) => {
    try {
        const { studyId } = req.params;

        const study = await Study.findById(studyId);
        if (!study) {
            return res.status(404).json({ error: 'Study not found' });
        }

        // Find all logs associated with this study
        const logs = await Log.find({ studyId: studyId })
            .sort({ createdAt: 1 });

        if (!logs.length) {
            return res.status(404).json({ error: 'No logs found for this study' });
        }

        // Labels and mapping for CSV fields
        const fields = [
            { label: 'Participant ID', value: 'participant' },
            { label: 'Study ID', value: 'studyId' },
            { label: study.xAxisName || 'logX', value: 'logX' },
            { label: study.yAxisName || 'logY', value: 'logY' },
            { label: 'Post Intervention', value: 'isPostIntervention' },
            { label: 'Comment', value: 'comment' },
            { label: 'Date Created', value: 'createdAt' }
        ];

        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(logs);

        // Send CSV file
        res.header('Content-Type', 'text/csv');
        res.attachment(`${study.studyName}_data.csv`);
        return res.send(csv);

    } catch (error) {
        console.error('Error generating study data download:', error);
        res.status(500).json({ error: 'Error generating study data download' });
    }
};

exports.createStudy = async (req, res) => {

    try {
        const { studyName, xAxisName, yAxisName} = req.body;

        // Validation checks
        if (!studyName || !xAxisName || !yAxisName) {
            return res.status(400).json({ error: 'All fields are required.' });
        }   

        const newStudy = new Study({
            studyName,
            xAxisName,
            yAxisName
        });
        await newStudy.save();

        res.status(201).json({
            message: "Study created",
            study: newStudy});

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server error' });
    }       
};

