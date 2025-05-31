import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  Divider,
  Chip,
  Container,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HotelIcon from "@mui/icons-material/Hotel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

// Enhanced styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  background: "linear-gradient(135deg, #6da7ec 10%, #0ba4dd 90%)",
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(4),
  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  backdropFilter: "blur(10px)",
}));

const GlassPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: "rgba(255,255,255,0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.shape.borderRadius * 1.5,
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const WardListItem = styled(ListItem)(({ theme, selected }) => ({
  marginBottom: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: selected
    ? theme.palette.primary.main
    : "rgba(255,255,255,0.8)",
  color: selected
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  boxShadow: selected
    ? "0 6px 12px rgba(0,0,0,0.2)"
    : "0 2px 4px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02) translateX(5px)",
    backgroundColor: selected
      ? theme.palette.primary.dark
      : "rgba(255,255,255,0.9)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
}));

const AnimatedBedCard = styled(Card)(({ theme, isoccupied }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  background:
    isoccupied === "true"
      ? "linear-gradient(45deg, #ffebee 30%, #ffcdd2 90%)"
      : "linear-gradient(45deg, #e8f5e9 30%, #c8e6c9 90%)",
  boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
  border:
    isoccupied === "true"
      ? `2px solid ${theme.palette.error.main}`
      : "2px solid transparent",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.2)",
  },
}));

const StyledStatChip = styled(Chip)(({ theme, variant }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  height: 40,
  borderRadius: 20,
  fontWeight: 700,
  fontSize: "1rem",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  backgroundColor:
    variant === "total"
      ? theme.palette.info.light
      : variant === "occupied"
      ? theme.palette.error.light
      : theme.palette.success.light,
  color:
    variant === "total"
      ? theme.palette.info.contrastText
      : variant === "occupied"
      ? theme.palette.error.contrastText
      : theme.palette.success.contrastText,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
  },
  transition: "all 0.2s ease-in-out",
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 300,
  background: "linear-gradient(45deg, #f5f5f5 30%, #eeeeee 90%)",
  borderRadius: theme.shape.borderRadius * 2,
  border: "2px dashed",
  borderColor: theme.palette.divider,
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #eeeeee 30%, #e0e0e0 90%)",
    transform: "scale(1.01)",
  },
}));

// const handleNavigate = ()=>{

// }

const Wards = () => {
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (wards.length > 0 && !selectedWard) {
      setSelectedWard(wards[0]);
    }
  }, [wards, selectedWard]);

  useEffect(() => {
    const fetchWards = async () => {
      try {
        const res = await axios.get("/ward");
        const data = res.data;

        const transformedWards = data.wards.map((ward) => {
          const occupiedBeds = ward.occupied_beds.map((ob) => ({
            id: ob.bed_no,
            isOccupied: true,
            patientName: `Patient ID: ${ob.patient}`,
          }));

          const occupiedBedNos = new Set(occupiedBeds.map((b) => b.id));
          const allBeds = [];
          for (let i = 1; i <= ward.total_beds; i++) {
            if (occupiedBedNos.has(i)) {
              allBeds.push(occupiedBeds.find((b) => b.id === i));
            } else {
              allBeds.push({
                id: i,
                isOccupied: false,
                patientName: null,
              });
            }
          }

          return {
            ...ward,
            beds: allBeds,
          };
        });

        setWards(transformedWards);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWards();
  }, []);

  const handleWardSelect = (ward) => {
    setSelectedWard(ward);
  };

  return (
    wards.length > 0 && (
      <StyledContainer maxWidth="xl">
        <Box sx={{ py: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 900,
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              mb: 4,
            }}
          >
            <LocalHospitalIcon
              sx={{
                mr: 2,
                fontSize: "2.5rem",
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.2))",
              }}
            />
            Hospital Wards Management
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <GlassPaper elevation={6} sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 800,
                    color: "primary.main",
                    mb: 2,
                  }}
                >
                  Select Ward
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <List component="nav">
                  {wards.map((ward) => (
                    <WardListItem
                      key={ward.id}
                      button
                      selected={selectedWard && selectedWard.id === ward.id}
                      onClick={() => handleWardSelect(ward)}
                    >
                      <ListItemText
                        primary={ward.name}
                        primaryTypographyProps={{
                          fontWeight: 600,
                        }}
                      />
                    </WardListItem>
                  ))}
                </List>
              </GlassPaper>
            </Grid>

            <Grid item xs={12} md={9}>
              <GlassPaper elevation={6} sx={{ p: 4 }}>
                {selectedWard ? (
                  <>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: "primary.main",
                        mb: 3,
                        borderBottom: "2px solid",
                        borderColor: "primary.light",
                        pb: 1,
                      }}
                    >
                      {selectedWard.name} - Bed Status
                    </Typography>

                    <Grid container spacing={3} sx={{ mb: 4 }}>
                      {selectedWard.beds.map((bed) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={bed.id}>
                          <AnimatedBedCard
                            isoccupied={bed.isOccupied.toString()}
                          >
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      fontWeight: 600,
                                      color: bed.isOccupied
                                        ? "error.main"
                                        : "success.main",
                                    }}
                                  >
                                    <HotelIcon
                                      fontSize="small"
                                      sx={{
                                        mr: 1,
                                      }}
                                    />
                                    Bed #{bed.id}
                                  </Typography>

                                  {bed.isOccupied && (
                                    <Button
                                      onClick={() =>
                                        navigate(
                                          `/profile/${
                                            bed.patientName.split(": ")[1]
                                          }`
                                        )
                                      }
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          color: "error.main",
                                          mt: 0.5,
                                        }}
                                      >
                                        <PersonIcon
                                          fontSize="small"
                                          sx={{
                                            mr: 0.5,
                                          }}
                                        />
                                        {bed.patientName}
                                      </Typography>
                                    </Button>
                                  )}
                                </Box>
                              </Box>
                            </CardContent>
                          </AnimatedBedCard>
                        </Grid>
                      ))}
                    </Grid>

                    <Divider
                      sx={{
                        mb: 4,
                        "&::before, &::after": {
                          borderColor: "primary.light",
                        },
                      }}
                    />

                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="center"
                      spacing={2}
                      sx={{ px: 2 }}
                    >
                      <StyledStatChip
                        icon={<HotelIcon />}
                        label={`Total Beds: ${selectedWard.beds.length}`}
                        variant="total"
                      />
                      <StyledStatChip
                        icon={<CheckCircleIcon />}
                        label={`Occupied: ${
                          selectedWard.beds.filter((bed) => bed.isOccupied)
                            .length
                        }`}
                        variant="occupied"
                      />
                      <StyledStatChip
                        icon={<CancelIcon />}
                        label={`Available: ${
                          selectedWard.beds.filter((bed) => !bed.isOccupied)
                            .length
                        }`}
                        variant="available"
                      />
                    </Stack>
                  </>
                ) : (
                  <EmptyStateBox>
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: "center",
                        fontWeight: 500,
                        opacity: 0.8,
                        color: "text.secondary",
                      }}
                    >
                      Please select a ward to view bed status
                    </Typography>
                  </EmptyStateBox>
                )}
              </GlassPaper>
            </Grid>
          </Grid>
        </Box>
      </StyledContainer>
    )
  );
};

export default Wards;
