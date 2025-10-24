const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },

    studyId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Study'
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

module.exports = mongoose.model('DailyLog', dailyLogSchema);