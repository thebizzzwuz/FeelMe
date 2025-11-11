const mongoose = require('mongoose');

// Structure for studies schema
const studiesSchema = new mongoose.Schema ({

    nameStudy: {
        type: String,
        required: true,
    },
    variableOne: {
        type: String,
        required: true,
    },

    variableTwo: {
        type: String,
        required: true,
    },

    linkertLabels: {
        type: String,
        required: true,
    },
    quadrantOneColor: {
        type: String,
        required: false,
    },
    quadrantTwoColor: {
        type: String,
        required: false,
    },
    quadrantThreeColor: {
        type: String,
        required: false,
    },
    quadrantFourColor: {
        type: String,
        required: false,
    },
})

    //Exports the model
    module.exports = mongoose.model('Studies', studiesSchema);