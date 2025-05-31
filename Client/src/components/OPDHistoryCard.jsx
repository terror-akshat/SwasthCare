//this is the card component used in the ViewOPD_History.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Chip, Divider, Grid, Paper } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { useNavigate } from "react-router-dom";
// import {useState } from "react";

export default function OPDHistoryCard({
  patientName,
  date,
  diagnosis,
  doctor,
  visitTime = "10:30 AM",
  department = "General Medicine",
  patientId,
  image,
}) {
  // Add useNavigate hook for routing
  const navigate = useNavigate();

  // Default props if not provided
  patientName = patientName || "Patient Name";
  date = date || "DD/MM/YYYY";
  diagnosis = diagnosis || "No diagnosis available";
  doctor = doctor || "Dr. Physician";

  // Handle view details click
  const handleViewDetails = () => {
    // Navigate to view-opd route, passing patientId as a parameter if available
    if (patientId) {
      navigate(`/view-opd?id=${patientId}`, { state: image });
    } else {
      navigate("/view-opd", { state: image });
    }
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        borderRadius: 2,
        margin: "8px 16px",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: 0.75,
          px: 2,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{ fontSize: "0.875rem" }}
        >
          OPD Record
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccessTimeIcon sx={{ fontSize: "0.875rem", mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {visitTime}
          </Typography>
        </Box>
      </Box>

      <CardContent sx={{ pt: 1, pb: 0.5, px: 2 }}>
        <Grid container spacing={1}>
          {/* Left side - Patient info */}
          <Grid item xs={7}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
              <Avatar
                sx={{
                  bgcolor: "secondary.main",
                  width: 40,
                  height: 40,
                  mr: 1.5,
                }}
              >
                {patientName.charAt(0)}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    lineHeight: 1.2,
                  }}
                >
                  {patientName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.7rem",
                    lineHeight: 1.2,
                  }}
                >
                  Attending: {doctor}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right side - Visit details */}
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <EventNoteIcon
                  sx={{ fontSize: "0.75rem", mr: 0.5, color: "text.secondary" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                >
                  {date}
                </Typography>
              </Box>
              <Chip
                icon={<LocalHospitalIcon sx={{ fontSize: "0.75rem" }} />}
                label={department}
                size="small"
                variant="outlined"
                sx={{
                  height: "20px",
                  "& .MuiChip-label": {
                    fontSize: "0.65rem",
                    px: 1,
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 0.5 }} />

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                bgcolor: "background.default",
                p: 0.75,
                borderRadius: 1,
                mb: 0.5,
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{
                  fontWeight: "medium",
                  color: "text.primary",
                  mb: 0,
                  fontSize: "0.7rem",
                  lineHeight: 1.2,
                }}
              >
                Diagnosis:
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: "0.7rem",
                  lineHeight: 1.2,
                }}
              >
                {diagnosis}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        sx={{ px: 2, pb: 1, pt: 0, justifyContent: "space-between" }}
      >
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={handleViewDetails}
            sx={{
              borderRadius: 4,
              textTransform: "none",
              px: 1,
              py: 0.25,
              fontSize: "0.7rem",
              minHeight: "24px",
            }}
          >
            View Details
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 4,
              ml: 1,
              textTransform: "none",
              px: 1,
              py: 0.25,
              fontSize: "0.7rem",
              minHeight: "24px",
            }}
          >
            Print
          </Button>
        </Box>

        <Chip
          label="Completed"
          size="small"
          color="success"
          variant="outlined"
          sx={{
            height: "20px",
            "& .MuiChip-label": {
              fontSize: "0.65rem",
              px: 1,
            },
          }}
        />
      </CardActions>
    </Card>
  );
}
