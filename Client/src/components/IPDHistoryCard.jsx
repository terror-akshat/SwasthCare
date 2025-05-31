// This is the card component used for In-Patient Department history
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Chip,
  Divider,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";
import BedIcon from "@mui/icons-material/Bed";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useNavigate } from "react-router-dom";

export default function IPDHistoryCard({
  patientName,
  admissionDate,
  dischargeDate,
  diagnosis,
  doctor,
  wardName,
  bedNumber,
  registrationId,
  image,
  treatmentProgress = 70, // Default treatment progress percentage
  status, // Default status (Admitted, Discharged, Critical)
}) {
  // Add useNavigate hook for routing
  const navigate = useNavigate();

  // Default props if not provided
  patientName = patientName || "Patient Name";
  admissionDate = admissionDate || "DD/MM/YYYY";
  dischargeDate = dischargeDate || "Ongoing";
  diagnosis = diagnosis || "No diagnosis available";
  doctor = doctor || "Dr. Physician";

  // Calculate days of stay
  const calculateStayDuration = () => {
    if (dischargeDate === "Ongoing") {
      // Calculate days from admission to today
      const admissionDateObj = new Date(admissionDate);
      const today = new Date();
      const diffTime = Math.abs(today - admissionDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    } else {
      // Calculate days between admission and discharge
      const admissionDateObj = new Date(admissionDate);
      const dischargeDateObj = new Date(dischargeDate);
      const diffTime = Math.abs(dischargeDateObj - admissionDateObj);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} days`;
    }
  };

  // Get status color
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case "discharged":
        return "success";
      case "critical":
        return "error";
      case "admitted":
      default:
        return "info";
    }
  };

  // Handle view details click
  const handleViewDetails = () => {
    // Navigate to view-ipd route, passing patientId as a parameter if available
    if (registrationId) {
      navigate(`/view-ipd?id=${registrationId}`, { state: image });
    } else {
      navigate("/view-ipd", { state: image });
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
          bgcolor: "primary.main", // Changed to primary color
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
          IPD Record
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <BedIcon sx={{ fontSize: "0.875rem", mr: 0.5 }} />
          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
            Bed :{bedNumber}
          </Typography>
          <Typography variant="body2" sx={{ marginLeft:"20px", fontSize: "0.75rem" }}>
            Ward : {wardName}
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
                  bgcolor: "primary.main", // Changed to primary color
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

          {/* Right side - Admission details */}
          <Grid item xs={5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <CalendarTodayIcon
                  sx={{ fontSize: "0.75rem", mr: 0.5, color: "text.secondary" }}
                />
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.7rem", color: "text.secondary" }}
                >
                  {calculateStayDuration()}
                </Typography>
              </Box>
              <Chip
                icon={<MedicalServicesIcon sx={{ fontSize: "0.75rem" }} />}
                label={wardName}
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

        {/* Treatment Progress - Specific to IPD */}
        <Box sx={{ mt: 0.5, mb: 0.75 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 0.25,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontSize: "0.7rem", color: "text.secondary" }}
            >
              Treatment Progress
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "0.7rem", fontWeight: "medium" }}
            >
              {treatmentProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={treatmentProgress}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 3,
              },
            }}
          />
        </Box>

        {/* Admission Period - Specific to IPD */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", color: "text.secondary", mr: 0.5 }}
            >
              Admitted:
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", fontWeight: "medium" }}
            >
              {admissionDate}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", color: "text.secondary", mr: 0.5 }}
            >
              Discharge:
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.65rem", fontWeight: "medium" }}
            >
              {dischargeDate}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{ px: 2, pb: 1, pt: 0, justifyContent: "space-between" }}
      >
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={handleViewDetails}
            color="primary" // Changed to primary color
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
            color="primary" // Changed to primary color
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
            Medical Records
          </Button>
        </Box>

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
      </CardActions>
    </Card>
  );
}
