const Study = require("../models/Study");

exports.createStudy = async (req, res) => {
    try {
        const { studyName, xAxisName, yAxisName, adminId } = req.body;

        // Validation checks
        if (!studyName || !xAxisName || !yAxisName || !adminId) {
            return res.status(400).json({ error: 'All fields are required.' });
        }   

        const newStudy = new Study({
            studyName: studyName,
            xAxisName: xAxisName,
            yAxisName: yAxisName,
            adminId: adminId,
        });
        await newStudy.save();

        res.status(201).json({ newStudy });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server error' });
    }       
};

