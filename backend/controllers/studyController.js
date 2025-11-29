const Study = require("../models/Study");

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

