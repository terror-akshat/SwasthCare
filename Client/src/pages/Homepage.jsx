import React, { useEffect, useState } from "react";
import FABCom from "../components/FABCom"; // Floating Button to open form
//import DrawerComponent from "../components/MiniDrawer";
import Table from "../components/Table.jsx";
import { Box } from "@mui/material";
import CreateOPDForm from "../pages/OPD.jsx"; // OPD Form Component
import axios from "../axios.js";
import Navbar from "../components/Navbar.jsx";

const Homepage = () => {
  //const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState([]); // State for patient list
  const [opdOpen, setOpdOpen] = useState(false); // OPD Form Dialog State
  const [selectedPatient, setSelectedPatient] = useState(null); // Selected Patient Data

  //searching logic
  const [searchQ, setSearchQ] = useState("");
  const onSearch = (query) => {
    setSearchQ(query);
  };  

  // Function to add a new patient to the table and open OPD form
  const addPatient = (newPatient) => {
    setSelectedPatient(newPatient); // Store patient details for OPD Form
    setOpdOpen(true); // Open OPD Form after registration
  };

  //Get Patient Route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/auth/get-patient"
        );

        if (response.data.status === true) {
          setPatients(response.data.patient);
        }
        if (response.data.status === false) {
          console.error(response.data.msg);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar onSearch={onSearch}/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          minHeight: 'calc(100vh - 64px)', // subtract navbar height
          padding: 3,
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <Table patients={patients} searchQ={searchQ} />
      </Box>

      {/* Floating Action Button for Adding a Patient */}
      <FABCom addPatient={addPatient} />

      {/* OPD Form - Opens automatically after patient registration */}
      {/* <CreateOPDForm
        open={opdOpen}
        handleClose={() => setOpdOpen(false)}
        patientData={selectedPatient}
      /> */}
    </>
  );
};

export default Homepage;