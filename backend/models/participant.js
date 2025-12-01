const mongoose = require('mongoose');

// Structure for participant schema
const participantSchema = new mongoose.Schema ({

    participantId: {
        type: Number,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    assignedResearcher:{
        type: String,
        required: false,
    },
    researcherEmail:{
        type: String,
        required: false,
    },
    irbApprovalNumber:{
        type: String,
        required: false,
    },
    study:{
        type: String,
        required: false,
    },
}, { timestamps: true })

//Exports the model
module.exports = mongoose.model('Participant', participantSchema);