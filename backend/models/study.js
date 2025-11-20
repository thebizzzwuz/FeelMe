const mongoose = require('mongoose');

const studySchema = new mongoose.Schema({

    studyName: {
        type: String,
        required: true,
        unique: true
    },

    xAxisName: {
        type: String,
        required: true
    },

    yAxisName: {
        type: String,
        required: true
    },

    color1: {
        type: String,
        required: false,
    },

    color2: {
        type: String,
        required: false,
    },

    color3: {
        type: String,
        required: false,
    },

    color4: {
        type: String,
        required: false,
    },  

})

module.exports = mongoose.model('Study', studySchema);