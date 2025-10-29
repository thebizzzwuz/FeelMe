const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({

    participant:{
        type:mongoose.Schema.Types.ObjectId,
        //For Testing
        //type:String,
        required: true,
        index: true,
        ref: 'participant'
    },

    studyId:{
        type: mongoose.Schema.Types.ObjectId,
        //For testing
        //type:String,
        required: true,
        index: true,
        ref: 'study'
    },

    logX:{
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    logY:{
        type: Number,
        required: true,
        min: 0,
        max: 10
    },

    timestamp:{
        type: Date,
        required: true,
        default: Date.now
    },

    isPostIntervention:{
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = mongoose.model('Log', dailyLogSchema);