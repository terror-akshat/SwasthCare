import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { toast } from 'react-hot-toast';
import axios from "../axios.js";

const DialogForm = ({ open, handleClose, addPatient, patientData, isEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    fatherName: "",
    motherName: "",
    gender: "",
    email: "",
    date: "",
    bp: "",
    temperature: "",
    spo2: "",
    pulseRate: "",
    weight: "",
  });

  const [errors, setErrors] = useState({
    phone: false,
  });

  useEffect(() => {
    if (patientData !== undefined) {
      setFormData({
        name: patientData.name,
        age: patientData.age,
        phone: patientData.phone,
        fatherName: patientData.fatherName,
        motherName: patientData.motherName,
        gender: patientData.gender,
        email: patientData.email,
        date: patientData.dateOfBirth,
        bp: patientData.opd?.bp,
        temperature: patientData.opd?.temperature,
        spo2: patientData.opd?.spo2,
        pulseRate: patientData.opd?.pulse_rate,
        weight: patientData.opd?.weight,
      });
    }
  }, [patientData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'phone') {
      setErrors({
        ...errors,
        phone: false,
      });
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      setErrors({
        ...errors,
        phone: true,
      });
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const {
      name,
      phone,
      fatherName,
      motherName,
      gender,
      email,
      date,
      bp,
      temperature,
      spo2,
      pulseRate,
      weight,
    } = formData;

    const age = calculateAge(date);

    console.log(patientData, "patientData");

    try {
      const response = await axios.post("/auth/add-patient", {
        name,
        phone,
        fatherName,
        motherName,
        age,
        gender,
        email,
        date: new Date(date).toISOString(),
        bp,
        temperature,
        spo2,
        pulseRate,
        weight,
      });

      if (response.data.status === true) {
        addPatient(formData);
        setFormData({
          name: "",
          phone: "",
          fatherName: "",
          motherName: "",
          gender: "",
          email: "",
          date: "",
          bp: "",
          temperature: "",
          spo2: "",
          pulseRate: "",
          weight: "",
        });
        toast.success("Patient added successfully!");
        handleClose();
      } else {
        toast.error(response.data.msg || "Failed to add patient");
      }
    } catch (error) {
      toast.error("An error occurred while adding the patient");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!isEdit && !validatePhone(formData.phone)) {
      setErrors({
        ...errors,
        phone: true,
      });
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    const age = calculateAge(formData.date);

    try {
      const response = await axios.put(`/auth/${patientData.opd._id}`, {
        ...formData,
        age, // Send calculated age
      });
      if (response.status) {
        handleClose();
        setFormData({
          name: "",
          phone: "",
          fatherName: "",
          motherName: "",
          gender: "",
          email: "",
          date: "",
          bp: "",
          temperature: "",
          spo2: "",
          pulseRate: "",
          weight: "",
        });
        toast.success("OPD updated successfully!");
      }
    } catch (err) {
      toast.error("An error occurred while updating the OPD");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.name}
          disabled={isEdit}
        />
        <TextField
          name="phone"
          label="Phone No."
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.phone}
          disabled={isEdit}
          error={errors.phone}
          helperText={errors.phone ? "Phone number must be exactly 10 digits" : ""}
          inputProps={{ maxLength: 10 }}
        />
        <TextField
          name="fatherName"
          label="Father's Name"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.fatherName}
          disabled={isEdit}
        />
        <TextField
          name="motherName"
          label="Mother's Name"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.motherName}
          disabled={isEdit}
        />

        <FormControl fullWidth margin="dense">
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleSelectChange}
            disabled={isEdit}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </FormControl>

        <TextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.email}
          disabled={isEdit}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.date}
          InputLabelProps={{ shrink: true }}
          disabled={isEdit}
        />
        <TextField
          name="bp"
          label="BP"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.bp}
        />
        <TextField
          name="temperature"
          label="Temperature"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.temperature}
        />
        <TextField
          name="spo2"
          label="SPO2"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.spo2}
        />
        <TextField
          name="pulseRate"
          label="Pulse Rate"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.pulseRate}
        />
        <TextField
          name="weight"
          label="Weight"
          fullWidth
          margin="dense"
          onChange={handleChange}
          value={formData.weight}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {!isEdit ? (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        ) : (
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogForm;