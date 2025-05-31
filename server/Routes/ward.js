const router = require("express").Router();
const Ward = require("../Models/wards.js");
const { isMaster, isAdmin } = require("../verifyAuth.js");

router.post("/newWard", isMaster, async (req, res) => {
  try {
    const { name, total_beds } = req.body;
    const newWard = new Ward({ name: name, total_beds: total_beds });
    const existingward = await Ward.findOne({ name: newWard });
    if (existingward) {
      return res.status(409).json({
        status: "failure",
        message: "Ward already exists",
      });
    }
    await newWard.save();
    res.status(201).json({
      status: "success",
      message: "Ward created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Something is wrong! Couldn't create ward",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const wards = await Ward.find({});
    res.status(200).json({
      status: "success",
      message: "Bed fetch",
      wards,
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: "Something went wrong while fetching wards",
    });
  }
});

router.put("/update", isMaster, async (req, res) => {
  try {
    const { wardName, requestNumber } = req.body;
    const ward = await Ward.findOne({ name: wardName });
    const bedsToAdd = Number(requestNumber);
    const currentBeds = Number(ward.total_beds);
    if (ward.total_beds == 0 && requestNumber < 0) {
      return res.status(409).json({
        status: "failure",
        message: "Bed number  is alredy 0",
      });
    }
    ward.total_beds = currentBeds + bedsToAdd;
    await ward.save();
    return res.status(200).json({
      status: "success",
      message: "Bed added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "failure",
      message: "Something went wrong while adding beds",
    });
  }
});

module.exports = router;
