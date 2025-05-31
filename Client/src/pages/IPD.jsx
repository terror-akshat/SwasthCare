import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import axios from "../axios.js";
import toast, { Toaster } from "react-hot-toast";

const IPDForm = ({ open, handleClose, patient, shift }) => {
  const [formData, setFormData] = useState({
    ward: "",
    bed: "",
  });
  const [error, setError] = useState(null);

  const [wardsData, setWardsData] = useState({});
  const [occupiedBeds, setOccupiedBeds] = useState({});
  const [beds, setBeds] = useState({}); // Track occupied beds
  
  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const response = await axios.get("/ward");
        const data = response.data.wards;
        data.map((ward) => {
          setWardsData((prev) => ({
            ...prev,
            [ward.name]: ward.total_beds,
          }));
          if (ward.occupied_beds.length === 0) {
            setOccupiedBeds((prev) => ({
              ...prev,
              [ward.name]: [],
            }));
          } else {
            const beds = [];
            ward.occupied_beds.map((bed) => {
              beds.push(bed.bed_no);
            });

            setOccupiedBeds((prev) => ({
              ...prev,
              [ward.name]: beds,
            }));
          }
        });
      } catch (err) {
        console.error("Error fetching wards:", err);
      }
    };
    fetchWards();
  }, []);

  // Handle Ward Change & Reset Bed Selection
  const handleWardChange = (e) => {
    const ward = e.target.value;
    setFormData({ ...formData, ward, bed: "" }); // Reset bed selection
  };

  // Handle Bed Selection
  const handleBedSelect = (bedNumber) => {
    setFormData((prev) => ({
      ...prev,
      bed: bedNumber === prev.bed ? "" : bedNumber, // Toggle bed selection
    }));
  };

  //Shift and ipd logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shift) {
      try {
        const response = await axios.post(`/ipd/${patient._id}`, formData);
        if (response.data.status !== "success") {
          toast.error(response.data.message)
          setError(response.data.message);
          return;
        }
        // Mark bed as occupied after successful API call
        setBeds((prev) => ({
          ...prev,
          [`${formData.ward}-${formData.bed}`]: true,
        }));

        // Reset Form
        setFormData({
          patientName: "",
          age: "",
          contact: "",
          guardianName: "",
          address: "",
          ward: "",
          bed: "",
        });
        toast.success("IPD created successfully!")
      } catch (err) {
        console.error("Error submitting IPD form:", err);
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
      handleClose();
    } else {
      try {
        const response = await axios.put(`/ipd/shift/${patient._id}`, {
          ward: formData.ward,
          bed: formData.bed,
          ipd: patient.Ipd._id,
        });

        if (response.data.status !== "success") {
          toast.error(response.data.message)
          setError(response.data.message);
          return;
        }
        setFormData({
          patientName: "",
          age: "",
          contact: "",
          guardianName: "",
          address: "",
          ward: "",
          bed: "",
        });
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response?.data?.message || "Couldn't shift patient!")
        setError(
          error.response?.data?.message || "An unexpected error occurred."
        );
      }
      handleClose();
    }
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
    <Toaster position="top-right" />
      <DialogTitle>IPD Admission Form</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Patient Details */}

            {/* Ward Selection */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Ward</InputLabel>
                <Select
                  name="ward"
                  value={formData.ward}
                  onChange={handleWardChange}
                >
                  <MenuItem value="">Select Ward</MenuItem>
                  {Object.keys(wardsData).map((ward) => (
                    <MenuItem key={ward} value={ward}>
                      {ward}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Bed Selection */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Select Bed:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {formData.ward &&
                  [...Array(wardsData[formData.ward])].map((_, index) => {
                    const bedNumber = index + 1;
                    const bedKey = `${formData.ward}-${bedNumber}`;
                    return (
                      <FormControlLabel
                        key={bedKey}
                        control={
                          <Checkbox
                            checked={formData.bed === bedNumber}
                            onChange={() => handleBedSelect(bedNumber)}
                            disabled={occupiedBeds[formData.ward].includes(
                              bedNumber
                            )}
                          />
                        }
                        label={`Bed ${bedNumber}`}
                      />
                    );
                  })}
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      {/* Buttons */}
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Admit Patient
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default IPDForm;
