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

module.exports = mongoose.model('Study', studySchema);