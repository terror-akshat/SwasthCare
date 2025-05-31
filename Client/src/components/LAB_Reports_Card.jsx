import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Avatar,
  Chip,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useNavigate } from "react-router-dom";

const LAB_Reports_Card = ({
  patientName,
  testName,
  testDate,
  doctor,
  status,
  reportLink,
}) => {
  const navigate = useNavigate();

  // Default props if not provided
  patientName = patientName || "Patient Name";
  testName = testName || "Test Name";
  testDate = testDate || "DD/MM/YYYY";
  doctor = doctor || "Dr. Physician";
  status = status || "Pending";

  // Get status color
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "critical":
        return "error";
      default:
        return "info";
    }
  };

  // Handle view report click
  const handleViewReport = () => {
    if (reportLink) {
      window.open(reportLink, "_blank");
    } else {
      alert("Report not available");
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
          Lab Report
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CalendarTodayIcon sx={{ fontSize: "0.875rem", mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            {testDate}
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
                  bgcolor: "primary.main",
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

          {/* Right side - Test details */}
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Chip
                icon={<MedicalServicesIcon sx={{ fontSize: "0.75rem" }} />}
                label={testName}
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
                Status:
              </Typography>
              <Chip
                label={status}
                size="small"
                color={getStatusColor()}
                variant="outlined"
                sx={{
                  height: "20px",
                  "& .MuiChip-label": {
                    fontSize: "0.65rem",
                    px: 1,
                  },
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        sx={{ px: 2, pb: 1, pt: 0, justifyContent: "space-between" }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={handleViewReport}
          color="primary"
          sx={{
            borderRadius: 4,
            textTransform: "none",
            px: 1,
            py: 0.25,
            fontSize: "0.7rem",
            minHeight: "24px",
          }}
        >
          View Report
        </Button>
      </CardActions>
    </Card>
  );
};

export default LAB_Reports_Card;