const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({

    participant:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'participant'
    },

    studyId:{
        //type: mongoose.Schema.Types.ObjectId,
        type:String,
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

    isPostIntervention:{
        type: Boolean,
        required: true,
        default: false
    },

    comment:{
        type: String,
        default: ''
    }
},
    {
        timestamps: {createdAt: true, updatedAt: false},
    }
    );

module.exports = mongoose.model('Log', dailyLogSchema);