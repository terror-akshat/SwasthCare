const { mongoose } = require("mongoose");
const Bill = require("../Models/bill");
const { Patient } = require("../Models/Schemas.js");

const router = require("express").Router();

router.post("/new/:id", async (req, res) => {
    try {
        const {
            patientDetails,
            charges,
            total_amount,
        } = req.body;

        const { id } = req.params;

        const newBill = await Bill.create({
            patientId: id,
            consultant: patientDetails.consultant,
            address: patientDetails.address,
            discount: patientDetails.discount,
            charges,
            total_amount,
        });

        const patient = await Patient.findById(id);
        if (!patient)
            return res
                .status(400)
                .json({ status: "failure", message: "Patient not found" });
            
        patient.past_bills.push(patient.bill)
        patient.bill = newBill._id;
        await patient.save();
        await newBill.save();
        res.status(201).json({
            status: "success",
            message: "Bill Created Successfully!",
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Something went wrong!",
            error: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate(["bill", "Ipd", "opd"]);
        if (!patient)
            return res
                .status(400)
                .json({
                    status: "failure",
                    message: "Wrong Request, Patient not found.",
                });

        res.status(200).json({
            status: "success",
            message: "Patient data fetched successfully.",
            patient,
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Something went wrong!",
            error: error.message,
        });
    }
});

module.exports = router;