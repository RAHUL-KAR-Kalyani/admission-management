const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    institute: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
        required: true,
    }
}, { timestamps: true });

const campusModel = mongoose.model('Campus', campusSchema);
module.exports = campusModel;