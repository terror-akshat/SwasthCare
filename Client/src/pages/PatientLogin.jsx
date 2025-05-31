import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";

const PatientLogin = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [patientID, setPatientID] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);

  // Handle tab switch
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setShowOtpField(false); // Reset OTP field when switching tabs
  };

  // Handle Patient ID Login
  const handlePatientLogin = () => {
    console.log("Patient ID Login:", { patientID, patientName });
    // Redirect to patient details page (implement logic as needed)
  };

  // Handle OTP Send
  const handleSendOTP = () => {
    if (phone.length === 10) {
      setShowOtpField(true);
      console.log("OTP Sent to:", phone);
      // Generate and send OTP logic here
    } else {
      alert("Enter a valid 10-digit mobile number.");
    }
  };

  // Handle OTP Verification
  const handleVerifyOTP = () => {
    console.log("Verifying OTP:", otp);
    // Verify OTP logic here
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: "400px", textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
          Patient Login
        </Typography>

        {/* Tabs for Login Options */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Patient ID Login" />
          <Tab label="Mobile OTP Login" />
        </Tabs>

        {/* Patient ID Login */}
        {tabIndex === 0 && (
          <>
            <TextField
              fullWidth
              label="Patient ID"
              variant="outlined"
              margin="normal"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
            />
            <TextField
              fullWidth
              label="Patient Name"
              variant="outlined"
              margin="normal"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              onClick={handlePatientLogin}
            >
              View Details
            </Button>
          </>
        )}

        {/* Mobile OTP Login */}
        {tabIndex === 1 && (
          <>
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            {!showOtpField ? (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleVerifyOTP}
                >
                  Verify OTP
                </Button>
              </>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default PatientLogin;
