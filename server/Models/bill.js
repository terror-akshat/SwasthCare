const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        address: String,
        consultant: String,
        charges: [
            {
                description: String,
                units: Number,
                rate: Number,
                amount: Number,
            },
        ],
        discount: {
            type: Number,
            default: 0
        },
        total_amount: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Bills", billSchema);
