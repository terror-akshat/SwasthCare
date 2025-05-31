import React from "react";
import { Link } from "react-router-dom";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Table = ({ patients, searchQ }) => {
  const filteredPatients = searchQ
    ? patients.filter(
        (patient) =>
          (patient.phone && patient.phone.toString().includes(searchQ.toLowerCase())) ||
          (patient.name && patient.name.toLowerCase().includes(searchQ.toLowerCase())) ||
          (patient.email && patient.email.toLowerCase().includes(searchQ.toLowerCase()))
      )
    : patients;

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '4px',
        }
      }}
    >
      <MuiTable sx={{ minWidth: 800, tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow
            sx={{ 
              backgroundColor: "primary.main", 
              "& th": { 
                color: "white",
                whiteSpace: 'nowrap',
                padding: '12px 16px'
              } 
            }}
          >
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Guardian's Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.map((patient, index) => (
            <TableRow 
              key={index}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0,0,0,0.04)'
                }
              }}
            >
              <TableCell 
                sx={{ 
                  maxWidth: 150,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {patient.name}
              </TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.fatherName}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell 
                sx={{ 
                  maxWidth: 150,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {patient.email}
              </TableCell>
              <TableCell>
                <Link
                  style={{
                    backgroundColor: "#EF0107",
                    color: "white",
                    padding: '4px 8px',
                    textDecoration: "none",
                    display: "inline-block",
                    borderRadius: 4,
                    fontSize: '0.8rem'
                  }}
                  to={`/profile/${patient._id}`}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;