const mongoose = require('mongoose');

const wardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    total_beds: {
        type: Number,
        required: true
    },
    occupied_beds: [
        {
            bed_no: { type: Number, required: true },
            patient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Patient",
                default: null
            }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model('Ward', wardSchema);