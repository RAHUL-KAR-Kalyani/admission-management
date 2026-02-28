const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    campus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campus',
        required: true,
    }
}, { timestamps: true });

const departmentModel = mongoose.model('Department', departmentSchema);
module.exports = departmentModel;