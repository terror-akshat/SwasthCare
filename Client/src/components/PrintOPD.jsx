import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField } from "@mui/material";

const PrintOPD = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const patientData = location.state?.patientData || {}; // Get passed data

    // Auto-trigger print and navigate back
    useEffect(() => {
        window.print();
        navigate(-1); // Go back after printing
    }, [navigate]);

    return (
        <div id="printable-area">
            <h2 style={{ textAlign: "center" }}>SAMREEN MEMORIAL HOSPITAL</h2>
            <p style={{ textAlign: "center" }}>
                Near Distt. Jail Chauraha, Grangani, Kanpur Road, Fatehgarh-Farrukhabad (U.P.)
            </p>
            <br>
            </br>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <TextField label="Patient's Name" value={patientData?.name || ""} fullWidth size="small" />
                <TextField label="Age/Sex" value={`${patientData?.age || ""} / ${patientData?.gender || ""}`} fullWidth size="small" />
                <TextField label="Phone" value={patientData?.phone || ""} fullWidth size="small" />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <TextField label="B.P." value={patientData?.bp || ""} fullWidth size="small" />
                <TextField label="Temp" value={patientData?.temperature || ""} fullWidth size="small" />
                <TextField label="SPO2" value={patientData?.spo2 || ""} fullWidth size="small" />
                <TextField label="Pulse Rate" value={patientData?.pulseRate || ""} fullWidth size="small" />
                <TextField label="Weight" value={patientData?.weight || ""} fullWidth size="small" />
            </Box>

            <Box sx={{ border: "2px solid #000", minHeight: "50vh", p: 3, mt: 2 }}>
                <strong>Rx (Prescription & Notes):</strong>
                <p style={{ minHeight: "60vh" }}>_____________________________________________________</p>
            </Box>

            <Box sx={{ textAlign: "right", mt: 4 }}>
                <p><strong>Signature of Doctor</strong></p>
            </Box>
            {/* Print Styling */}
<style>
{`
  @media print {
    body * { visibility: hidden; }
    #printable-area, #printable-area * { visibility: visible; }
    #printable-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 210mm;
      height: 350mm;
      padding: 20mm;
      font-size: 12pt;
    }
  }
`}
</style>
        </div>
    );
};

export default PrintOPD;