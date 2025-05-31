import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";

const CreateOPDForm = ({ open, handleClose, patientData, handleOPDSubmit }) => {
  // Local state for medicinal info
  const [formData, setFormData] = useState({
    bp: patientData?.bp || "",
    temperature: patientData?.temperature || "",
    spo2: patientData?.spo2 || "",
    pulseRate: patientData?.pulseRate || "",
    weight: patientData?.weight || "",
    complaints: patientData?.complaints || "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = () => {
    handleOPDSubmit(formData); // Send updated data to profile
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", fontSize: "20px" }}>
        SAMREEN MEMORIAL HOSPITAL - OPD FORM
      </DialogTitle>
      <DialogContent>
        {/* Patient Details */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField label="Patient's Name" variant="outlined" fullWidth margin="dense" size="small" value={patientData?.name || ""} disabled />
          <TextField label="Age/Sex" variant="outlined" fullWidth margin="dense" size="small" value={`${patientData?.age || ""} / ${patientData?.gender || ""}`} disabled />
          <TextField label="Date" variant="outlined" fullWidth margin="dense" size="small" value={patientData?.date || ""} disabled />
        </Box>

        {/* Vitals Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField name="bp" label="B.P." variant="outlined" fullWidth margin="dense" size="small" value={formData.bp} onChange={handleChange} />
          <TextField name="temperature" label="Temp" variant="outlined" fullWidth margin="dense" size="small" value={formData.temperature} onChange={handleChange} />
          <TextField name="spo2" label="SPO2" variant="outlined" fullWidth margin="dense" size="small" value={formData.spo2} onChange={handleChange} />
          <TextField name="pulseRate" label="Pulse Rate" variant="outlined" fullWidth margin="dense" size="small" value={formData.pulseRate} onChange={handleChange} />
          <TextField name="weight" label="Weight" variant="outlined" fullWidth margin="dense" size="small" value={formData.weight} onChange={handleChange} />
        </Box>

        {/* Chief Complaints Section */}
        {/* <Box sx={{ mb: 2 }}>
          <TextField name="complaints" label="Chief Complaints" variant="outlined" multiline rows={3} fullWidth size="small" value={formData.complaints} onChange={handleChange} />
        </Box> */}
      </DialogContent>

      {/* Form Actions */}
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="secondary">Close</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
export default CreateOPDForm;
