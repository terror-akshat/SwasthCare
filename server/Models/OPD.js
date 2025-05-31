const mongoose = require("mongoose");

const opdSchema = mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: { type: Date, default: Date.now },
  BP: { type: String },
  temperature: Number,
  spo2: Number,
  weight: Number,
  pulse_rate: Number,
  prescriptions: {
    type: String,
  },
  UploadOpd: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UploadOpd",
    },
  ],
});

module.exports = mongoose.model("OPD", opdSchema);
