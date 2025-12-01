const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({

    studyName: {
        type: String,
        required: true,
    },

    xAxisName: {
        type: String,
        required: true
    },

    yAxisName: {
        type: String,
        required: true
    }

})

const Study = mongoose.models.AllStudies || mongoose.model("AllStudies", studySchema);
module.exports = Study;