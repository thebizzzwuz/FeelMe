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
    }
}, { timestamps: true })

//Exports the model
module.exports = mongoose.model('Participant', participantSchema);