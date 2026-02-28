const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
    },
    category: {
        type: String,
        enum: ['General', 'OBC', 'SC', 'ST'],
        required: true,
    },
    entryType: {
        type: String,
        enum: ['Regular', 'Lateral'],
        required: true,
    },
    quotaType: {
        type: String,
        enum: ['KECT', 'COMEDK', 'Management'],
        required: true,
    },
    marks: {
        type: Number,
        required: true,
    },
    documents: {
        status: {
            type: String,
            enum: ["Pending", "Submitted", "Verified"],
            default: "Pending"
        }
    }
}, { timestamps: true });

const applicantModel = mongoose.model('Applicant', applicantSchema);
module.exports = applicantModel;