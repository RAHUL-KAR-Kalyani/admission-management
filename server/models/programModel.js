const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        // trim: true,
        // unique: true
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    academicYear: {
        type: String,
        required: true
    },
    courseType: {
        type: String,
        enum: ["UG", "PG"]
    },
    entryType: {
        type: String,
        enum: ["Regular", "Lateral"]
    },
    admissionMode: {
        type: String,
        enum: ["Government", "Management"]
    },
    intake: {
        type: Number,
        required: true
    },
    quotas: {
        KCET: { total: Number, filled: { type: Number, default: 0 } },
        COMEDK: { total: Number, filled: { type: Number, default: 0 } },
        Management: { total: Number, filled: { type: Number, default: 0 } }
    },
    supernumerarySeats: {
        total: { type: Number, default: 0 },
        filled: { type: Number, default: 0 }
    }
}, { timestamps: true });

const programModel = mongoose.model('Program', programSchema);
module.exports = programModel;