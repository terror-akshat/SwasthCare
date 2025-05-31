const mongoose = require("mongoose");

const ipdSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    admissionDate: { type: Date, default: Date.now },
    dischargeDate: { type: Date },
    currentWard: { type: String, required: true },
    currentBed: { type: String, required: true },
    history: [
      {
        fromWard: String,
        fromBed: String,
        toWard: String,
        toBed: String,
        shiftDate: { type: Date, default: Date.now },
      },
    ],
    UploadIpd: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UploadIpd",
      },
    ],

    UploadLabReport: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UploadLabReport",
      },
    ],

    doctorInCharge: { type: String },
    medicine: String,
    labInvestigations: String,
    deathCertificate: String,
    status: {
      type: String,
      enum: ["Admitted", "Discharged"],
      default: "Admitted",
    },
    registrationId: {
      type: Number,
      unique: true,
    },
  },
  { timestamps: true }
);

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Number, default: 1 },
});

const Counter = mongoose.model("Counter", counterSchema);

ipdSchema.pre("save", async function (next) {
  const doc = this;

  // Get the current counter value
  const counter = await Counter.findOneAndUpdate(
    { name: "registrationId" },
    { $inc: { value: 1 } }, // Increment the counter
    { new: true, upsert: true } // Create if doesn't exist
  );

  doc.registrationId = counter.value; // Assign the incremented ID
  next();
});

const IPD = mongoose.model("IPD", ipdSchema);

module.exports = IPD;
