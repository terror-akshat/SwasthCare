import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  Select,
  Table as MuiTable,
} from "@mui/material";

import axios from "../axios.js";

const AdminDashboard = () => {
  const [newWard, setNewWard] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [newBed, setNewBed] = useState("");
  const [bedNumber, setNewBedNumber] = useState();
  const [wards, setWard] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("/ward/");
        if (response.data.status == "success") {
          setWard(response.data.wards);
        }
        if (response.data.status === "failure") {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/ward/newWard", {
        name: newWard,
        total_beds: newBed,
      });
      if (response.data.status === "success") {
        // alert("Ward created successfully!");
        // setNewWard("");
        // setNewBed("");
        alert(response.data.message);
      }
      if (response.data.status === "failure") {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/ward/update", {
        wardName: selectedWard,
        requestNumber: bedNumber,
      });
      if (response.data.status == "success") {
        alert(response.data.message);
      }
      if (response.data.status == "failure") {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add new Ward
        </Typography>

        {/* Add Ward and Beds Section */}
        <form onSubmit={handleOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Ward"
                variant="outlined"
                value={newWard}
                onChange={(e) => setNewWard(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Bed Number"
                variant="outlined"
                value={newBed}
                onChange={(e) => setNewBed(e.target.value)}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Add
          </Button>
        </form>
      </Container>
      <Container maxWidth="md" style={{ marginTop: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update existing bed
        </Typography>

        {/* Add Ward and Beds Section */}
        <form onSubmit={handleOnUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {/* <TextField
                fullWidth
                label="New Ward"
                variant="outlined"
                value={newWard}
                onChange={(e) => setNewWard(e.target.value)}
              /> */}
              <Select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                fullWidth
              >
                <MenuItem value="" disabled>
                  Select a Ward
                </MenuItem>
                {wards.map((ward) => {
                  return (
                    <MenuItem key={ward._id} value={ward.name}>
                      {ward.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="New Bed Number"
                variant="outlined"
                value={bedNumber}
                onChange={(e) => setNewBedNumber(e.target.value)}
                style={{ marginTop: "10px" }}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Update
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AdminDashboard;
