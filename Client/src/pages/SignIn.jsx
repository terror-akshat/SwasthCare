import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext.jsx";

const Signin = () => {
  const navigate = useNavigate();
  
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    theme: "dark",
    draggable: true,
  };

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // ✅ Remove token on mount (force logout)
  // useEffect(() => {
  //   localStorage.removeItem("authToken");
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const {login} = useAuth();
  const from = location.state?.from?.pathname || '/homepage';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Username and password are required", toastOptions);
      return;
    }
    
    try {
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        toast.success("Login successful!", toastOptions);
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response) {
        // Handle different status codes
        switch (error.response.status) {
          case 401:
            toast.error("Invalid password", toastOptions);
            break;
          case 404:
            toast.error("No admin found with this username", toastOptions);
            break;
          case 500:
            toast.error("Server error. Please try again later.", toastOptions);
            break;
          default:
            toast.error(error.response.data.msg || "Login failed", toastOptions);
        }
      } else if (error.request) {
        toast.error("No response from server. Check your connection.", toastOptions);
      } else {
        toast.error("Login failed. Please try again.", toastOptions);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6da7ec",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                bgcolor: "#fff",
              }}
            >
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "#000",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                <LockOutlinedIcon />
              </Box>

              <Typography component="h1" variant="h5">
                Sign in
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: "100%" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
      <ToastContainer />
    </>
  );
};

export default Signin;
