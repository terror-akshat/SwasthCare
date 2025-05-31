const router = require("express").Router();
const IPD = require("../Models/IPD.js");
const { Patient } = require("../Models/Schemas.js");
const wards = require("../Models/wards.js");

router.post("/:patientId", async (req, res) => {
    try {
        const { ward, bed, doctorInCharge } = req.body;
        const patientId = req.params.patientId;
        const newIPD = new IPD({
            patientId,
            currentWard: ward,
            currentBed: bed,
            doctorInCharge,
        });
        const assignedBed = await wards.findOne({ name: ward });
        assignedBed.occupied_beds.push({
            // updating occupied beds in wards
            bed_no: bed,
            patient: patientId,
        });

        const patient = await Patient.findById(patientId);
        patient.Ipd = newIPD._id; // connecting patiend and his IPD form
        await assignedBed.save();
        await patient.save();
        await newIPD.save();
        res.status(201).json({
            status: "success",
            message: "IPD created successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Couldn't create IPD",
            error: error.message,
        });
    }
});

router.put("/shift/:patientId", async (req, res) => {
    try {
        const { ward, bed, ipd } = req.body;
        const ipdRecord = await IPD.findById(ipd);
        if (!ipdRecord)
            return res
                .status(404)
                .json({ status: "failure", message: "IPD record not found" });
        ipdRecord.history.push({
            fromWard: ipdRecord.currentWard,
            fromBed: ipdRecord.currentBed,
            toWard: ward,
            toBed: bed,
            shiftDate: new Date(),
        });

        const currWard = await wards.findOne({ name: ipdRecord.currentWard });
        if (!currWard) {
            return res
                .status(404)
                .json({ status: "failure", message: "Ward not found" });
        }
        currWard.occupied_beds = currWard.occupied_beds.filter(
            (bed) => bed.bed_no === ipdRecord.currentBed
        );

        const newWard = await wards.findOne({ name: ward });
        if (!newWard) {
            return res
                .status(404)
                .json({ status: "failure", message: "Ward not found" });
        }
        newWard.occupied_beds.push({
            bed_no: bed,
            patient: req.params.patientId,
        });

        ipdRecord.currentWard = ward;
        ipdRecord.currentBed = bed;

        await ipdRecord.save();
        await currWard.save();
        await newWard.save();
        res.status(200).json({
            status: "success",
            message: "Patient shifted successfully!",
        });
    } catch (error) {
        res.status(500).json({
            status: "failure",
            message: "Couldn't shift the patient!",
        });
    }
});

router.delete("/discharge/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({
                status: "failure",
                message: "Patient not found",
            });
        }

        if (!patient.Ipd || patient.Ipd === null) {
            return res.status(404).json({
                status: "failure",
                message: "IPD record not found",
            });
        }

        const ipdRecord = await IPD.findById(patient.Ipd);
        if (!ipdRecord) {
            return res.status(404).json({
                status: "failure",
                message: "IPD record not found",
            });
        }

        if (!ipdRecord.currentWard) {
            return res.status(400).json({
                status: "failure",
                message: "Patient's current ward is not assigned",
            });
        }

        const ward = await wards.findOne({ name: ipdRecord.currentWard });
        if (!ward) {
            return res.status(404).json({
                status: "failure",
                message: "Ward not found",
            });
        }

        if (!ward.occupied_beds || !Array.isArray(ward.occupied_beds)) {
            return res.status(500).json({
                status: "failure",
                message: "Ward data is incorrect",
            });
        }

        ipdRecord.history.push({
            fromWard: ipdRecord.currentWard,
            fromBed: ipdRecord.currentBed,
            toWard: null,
            toBed: null,
            shiftDate: new Date(),
        });

        ward.occupied_beds = ward.occupied_beds.filter(
            (bed) => bed.bed_no.toString() !== ipdRecord.currentBed.toString()
        );
        ward.markModified("occupied_beds");

        ipdRecord.status = "Discharged";
        const istDate = new Date().toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
        });
        ipdRecord.dischargeDate = new Date(istDate);
        patient.Ipd = null;

        await Promise.all([ward.save(), patient.save(), ipdRecord.save()]);

        return res.status(200).json({
            status: "success",
            message: "Patient discharged successfully",
            patient,
        });
    } catch (error) {
        console.error("Error discharging patient:", error);
        return res.status(500).json({
            status: "failure",
            message: "Internal Server Error",
            error: error.message,
        });
    }
});

module.exports = router;
