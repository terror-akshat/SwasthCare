const mongoose = require("mongoose");

const patient = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        fatherName: {
            type: String,
            required: true,
        },
        motherName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            // required: true,
        },
        Ipd: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IPD",
        },
        opd: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OPD",
        },
        avtar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Avtar",
        },
        bill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bills",
        },
        past_bills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bills" }],
    },
    { timestamps: true }
);

const upload_opd = mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OPD",
            required: true,
        },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

const upload_ipd = mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IPD",
            required: true,
        },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

const upload_lab_report = mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IPD",
            required: true,
        },
        image: { type: String, required: true },
    },
    { timestamps: true }
);

const avatar = mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const admin = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "master"],
    },
});

module.exports = {
    Patient: mongoose.model("patient", patient),
    // Ipd: mongoose.model("Ipd", Ipd),
    UploadOpd: mongoose.model("UploadOpd", upload_opd),
    UploadIpd: mongoose.model("UploadIpd", upload_ipd),
    UploadLabReport: mongoose.model("UploadLabReport", upload_lab_report),
    Admin: mongoose.model("admin", admin),
    Avtar: mongoose.model("Avtar", avatar),
};
