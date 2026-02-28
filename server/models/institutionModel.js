const mongoose = require('mongoose');

function generateCode() {
    return 'INS-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

const institutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    code: {
        type: String,
        unique: true,
        default: generateCode
    }
}, { timestamps: true });

const institutionModel = mongoose.model('Institution', institutionSchema);
module.exports = institutionModel;