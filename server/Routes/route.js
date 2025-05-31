const {
  handleRegister,
  handleLogin,
  handleAddPatient,
  handleGetPatient,
  getSpecificPatient,
  handleUpdateOPD,
  getSpecificOpd,
  updateNameAndPassword,
} = require("../Controllers/controle");
const { Admin } = require("../Models/Schemas");
const { isMaster, verifyToken } = require("../verifyAuth");
const route = require("express").Router();

route.post("/register", handleRegister);
route.post("/admin-login", handleLogin);
route.post("/add-patient", verifyToken, handleAddPatient);

route.get("/get-patient", verifyToken, handleGetPatient);
route.get("/get-specific-patient/:id", verifyToken, getSpecificPatient);
route.get("/get-specifc-opd/:id", getSpecificOpd);

route.put("/:opdId", verifyToken, handleUpdateOPD);
route.put("/update/:id", updateNameAndPassword);

// getting logged in user
route.get("/me", verifyToken, async (req, res) => {
  try {
    // req.user contains the decoded JWT payload from verifyToken middleware
    const userId = req.user.id;
    // Find the user by ID but exclude the password field
    const admin = await Admin.findById(userId).select("-password");

    if (!admin) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
      });
    }

    // Return the user information
    return res.status(200).json({
      status: true,
      admin: {
        _id: admin._id,
        username: admin.username,
        role: admin.role,
        // Add any other user properties you want to return
        // but exclude sensitive information
      },
    });
  } catch (error) {
    console.error("Error in auth/me route:", error);
    return res.status(500).json({
      status: false,
      msg: "Server error while retrieving user information",
    });
  }
});

route.post("/logout", (req, res) => {
  try {
    // Clear the authentication cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      status: true,
      msg: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout route:", error);
    return res.status(500).json({
      status: false,
      msg: "Server error during logout",
    });
  }
});

module.exports = route;
