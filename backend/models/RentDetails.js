const mongoose = require('mongoose')
const rentDetailSchema = new mongoose.Schema({
    rentAmount: {
        type: Number,
        required: true
    },
    electricity: {
        type: Number,
        required: true
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    lastPaid: {
        type: Date,

    },
    rentPaid: {
        type: Boolean,
        default: false
    },
    nextDueDate: {
        type: Date
    },
    tenet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
})


const RentDetail = mongoose.model('RentDetail', rentDetailSchema);
module.exports = RentDetail;