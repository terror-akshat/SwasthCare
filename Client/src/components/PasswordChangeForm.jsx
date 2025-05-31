import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "../axios.js";
import { useAuth } from "../context/AuthContext.jsx";
const PasswordChangeForm = () => {
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    username: currentUser.username,
    currentPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/auth/update/${currentUser._id}`, {
        username: formData.username,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      if (response.data.status === "success") {
        setFormData({
          username: "",
          currentPassword: "",
          newPassword: "",
        });
        alert("Password changed successfully");
      }
      if (response.data.status === "failure") {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 5,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Change Password
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          value={formData.username}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          required
          label="Current Password"
          name="currentPassword"
          type="password"
          margin="normal"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="New Password"
          name="newPassword"
          type="password"
          margin="normal"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default PasswordChangeForm;
