const mongoose = require('mongoose');

const admissionSchema = mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant',
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    quota: {
        type: String,
        enum: ["KCET", "COMEDK", "Management"],
        required: true
    },
    allotmentNumber: {
        type: String,
        // unique: true
    },
    admissionNumber: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        enum: ["Seat Locked", "Confirmed"],
        default: "Seat Locked"
    },
    feeStatus: {
        type: String,
        enum: ["Pending", "Paid"],
        default: "Pending"
    }
}, { timestamps: true });

const admissionModel = mongoose.model('Admission', admissionSchema);

module.exports = admissionModel;