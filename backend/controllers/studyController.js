const Study = require("../models/Study");

exports.createStudy = async (req, res) => {
    try {
        const { studyName, xAxisName, yAxisName, color1, color2, color3, color4 } = req.body;

        // Validation checks
        if (!studyName || !xAxisName || !yAxisName || !color1 || !color2 || !color3 || !color4) {
            return res.status(400).json({ error: 'All fields are required.' });
        }   

        const newStudy = new Study({
            studyName: studyName,
            xAxisName: xAxisName,
            yAxisName: yAxisName,
            color1: color1,
            color2: color2,
            color3: color3,
            color4: color4
        });
        await newStudy.save();

        res.status(201).json({ newStudy });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'server error' });
    }       
};

