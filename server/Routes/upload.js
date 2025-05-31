const fs = require("fs");
const router = require("express").Router();
const {
  UploadOpd,
  UploadIpd,
  UploadLabReport,
  Patient,
  Avtar,
} = require("../Models/Schemas.js");
const { cloudinary } = require("../cloudnary/cloudnary.js");
const OPD = require("../Models/OPD.js");
const IPD = require("../Models/IPD.js");

router.post("/upload-opd/:patientId", async (req, res) => {
  try {
    // const { filename } = req.file;
    const fileStr = req.body.data;

    const matches = fileStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image format" });
    }
    const buffer = Buffer.from(matches[2], "base64");

    const streamUpload = (bufferData) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: "Demo",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(bufferData);
      });
    };

    const uploadResult = await streamUpload(buffer);
    const patientOpd = await OPD.findById(req.params.patientId);
    if (!patientOpd) {
      return res
        .status(404)
        .json({ status: "failure", messgae: "Patient not found" });
    }
    const newOpdImage = new UploadOpd({
      patientId: req.params.patientId,
      image: uploadResult.public_id,
    });
    patientOpd.UploadOpd.push(newOpdImage._id);
    await patientOpd.save();
    await newOpdImage.save();
    res.status(201).json({
      status: "success",
      message: "OPD uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.get("/patient-opd-image/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await OPD.findById(patientId).populate({
      path: "UploadOpd",
      options: { sort: { createdAt: -1 } },
    });
    if (!patient) {
      return res
        .status(404)
        .json({ status: " failure", message: "patient not found" });
    }
    return res.status(200).json({ status: "success", patient: patient });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/upload-ipd/:patientId", async (req, res) => {
  try {
    const fileStr = req.body.data;

    const matches = fileStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image format" });
    }
    const buffer = Buffer.from(matches[2], "base64");

    const streamUpload = (bufferData) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: "Demo",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(bufferData);
      });
    };

    const uploadResult = await streamUpload(buffer);

    const patientIpd = await IPD.findById(req.params.patientId);
    if (!patientIpd) {
      return res
        .status(404)
        .json({ status: "failure", messgae: "Patient not found" });
    }
    const newIpdImage = new UploadIpd({
      patientId: req.params.patientId,
      image: uploadResult.public_id,
    });
    patientIpd.UploadIpd.push(newIpdImage._id);
    await patientIpd.save();
    await newIpdImage.save();
    res.status(201).json({
      status: "success",
      message: "IPD uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.get("/patient-ipd-image/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await IPD.findById(patientId).populate({
      path: "UploadIpd",
      options: { sort: { createdAt: -1 } },
    });
    if (!patient) {
      return res
        .status(404)
        .json({ status: " failure", message: "patient not found" });
    }
    return res.status(200).json({ status: "success", patient: patient });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.post("/upload-lab_report/:patientId", async (req, res) => {
  try {
    const fileStr = req.body.data;

    const matches = fileStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image format" });
    }
    const buffer = Buffer.from(matches[2], "base64");

    const streamUpload = (bufferData) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: "Demo",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(bufferData);
      });
    };

    const uploadResult = await streamUpload(buffer);

    const patientUploadLabReport = await IPD.findById(req.params.patientId);
    if (!patientUploadLabReport) {
      return res
        .status(404)
        .json({ status: "failure", messgae: "Patient not found" });
    }

    const newpatientUploadLabReportImage = new UploadLabReport({
      patientId: req.params.patientId,
      image: uploadResult.public_id,
    });
    patientUploadLabReport.UploadLabReport.push(
      newpatientUploadLabReportImage._id
    );
    await patientUploadLabReport.save();
    await newpatientUploadLabReportImage.save();
    res.status(201).json({
      status: "success",
      message: "Report uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.get("/get-lab_report/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await IPD.findById(patientId).populate({
      path: "UploadLabReport",
      options: { sort: { createdAt: -1 } },
    });
    if (!patient) {
      return res
        .status(404)
        .json({ status: " failure", message: "patient not found" });
    }
    return res.status(200).json({ status: "success", patient: patient });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});
router.post("/avtar/:patientId", async (req, res) => {
  try {
    const fileStr = req.body.data;

    const matches = fileStr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: "Invalid base64 image format" });
    }
    const buffer = Buffer.from(matches[2], "base64");

    const streamUpload = (bufferData) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: "Demo",
          },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        stream.end(bufferData);
      });
    };

    const uploadResult = await streamUpload(buffer);

    const profile = await Patient.findById(req.params.patientId);
    if (!profile) {
      return res
        .status(404)
        .json({ status: "failure", messgae: "Patient not found" });
    }

    const newAvtar = new Avtar({
      patientId: req.params.patientId,
      image: uploadResult.public_id,
    });

    profile.avtar = newAvtar._id;
    await profile.save();
    await newAvtar.save();
    res.status(201).json({
      status: "success",
      message: "Avtarr uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

router.get("/get-avtar/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId).populate("avtar");
    if (!patient) {
      return res
        .status(404)
        .json({ status: " failure", message: "patient not found" });
    }
    return res.status(200).json({ status: "success", patient: patient });
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

module.exports = router;
