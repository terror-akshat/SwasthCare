import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Paper,
    Grid,
    Button,
    Card,
    CardContent,
    Container,
    InputAdornment,
    AppBar,
    Toolbar,
    IconButton,
    Divider,
    MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "../axios.js";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const TotalCard = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
}));

const BillingForm = () => {
    const initialCharge = {
        description: "",
        units: "",
        rate: "",
        amount: 0,
    };

    const [charges, setCharges] = useState([{ ...initialCharge }]);
    const [totalAmount, setTotalAmount] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const id = location.state;

    // Patient details state
    const [patientDetails, setPatientDetails] = useState({
        name: "",
        age: "",
        gender: "",
        fatherName: "",
        registrationId: "",
        currentWard: "",
        address: "",
        discount: "0",
        consultant: "",
    });

    const handlePatientDetailChange = (field, value) => {
        setPatientDetails((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle charge row changes
    const handleChargeChange = (idx, field, value) => {
        const updated = [...charges];
        updated[idx][field] = value;
        if (field === "units" || field === "rate") {
            const units = parseFloat(updated[idx].units) || 0;
            const rate = parseFloat(updated[idx].rate) || 0;
            updated[idx].amount = units * rate;
        }
        setCharges(updated);
        setTotalAmount(updated.reduce((sum, c) => sum + (c.amount || 0), 0));
    };

    const addCharge = () => {
        setCharges([...charges, { ...initialCharge }]);
    };

    const removeCharge = (idx) => {
        if (charges.length === 1) return;
        const updated = charges.filter((_, i) => i !== idx);
        setCharges(updated);
        setTotalAmount(updated.reduce((sum, c) => sum + (c.amount || 0), 0));
    };

    const [loading, setLoading] = useState(false);

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        const getPatient = async () => {
            try {
                const response = await axios.get(
                    `/auth/get-specific-patient/${id}`
                );
                setPatient(response.data?.patient);
            } catch (error) { console.error(error ) }
        };
        getPatient();
    }, [id]);

    useEffect(() => {
        if (patient)
            setPatientDetails({
                name: patient?.name || "NA",
                age: patient?.age || "NA",
                gender: patient?.gender || "Select",
                fatherName: patient?.fatherName || "NA",
                registrationId: patient?.Ipd?.registrationId || "NA",
                currentWard: patient?.Ipd?.currentWard || "NA",
                address: patient?.address || "",
                discount: "0",
                consultant: patient?.consultant || "",
            });
    }, [patient]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`/bill/new/${id}`, {
                patientDetails,
                charges,
                total_amount: totalAmount
            });
            if (response.data.status === "failure") {
                toast.error(response.data.message || "Something went wrong!");
                return;
            }
            toast.success(response.data.message);
            setLoading(false);
            navigate("/hospital-bill", { state: id });
        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setCharges([{ ...initialCharge }]);
        setTotalAmount(0);
        setPatientDetails({
            name: "",
            age: "",
            gender: "",
            fatherName: "",
            registrationId: "",
            currentWard: "",
            address: "",
            discount: "",
            consultant: ""
        });
    };

    return (
        <>
            <Toaster position="top-right" />
            <Container maxWidth="lg">
                <AppBar
                    position="static"
                    color="primary"
                    elevation={0}
                    sx={{ borderRadius: "8px 8px 0 0", mb: 4 }}
                >
                    <Toolbar>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: "bold" }}
                        >
                            Hospital Billing Form
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Patient Details Section */}
                <StyledPaper elevation={2}>
                    <SectionTitle variant="h6">Patient Details</SectionTitle>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Patient Name"
                                fullWidth
                                value={patientDetails.name}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "name",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                label="Age"
                                type="number"
                                fullWidth
                                value={patientDetails.age}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "age",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6} sm={3} md={2}>
                            <TextField
                                select
                                label="Gender"
                                fullWidth
                                value={patientDetails.gender}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "gender",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Father's Name"
                                fullWidth
                                value={patientDetails.fatherName}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "fatherName",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="IPD No"
                                fullWidth
                                value={patientDetails.registrationId}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "registrationId",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Room Category"
                                fullWidth
                                value={patientDetails.currentWard}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "currentWard",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Address"
                                fullWidth
                                value={patientDetails.address}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "address",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TextField
                                label="Consultant"
                                fullWidth
                                value={patientDetails.consultant}
                                onChange={(e) =>
                                    handlePatientDetailChange(
                                        "consultant",
                                        e.target.value
                                    )
                                }
                                variant="outlined"
                            />
                        </Grid>

                        
                        {/* Removed Admit Date and Discharge Date fields */}
                    </Grid>
                </StyledPaper>

                {/* Charges Section */}
                <StyledPaper elevation={2}>
                    <SectionTitle variant="h6">Charges</SectionTitle>
                    {charges.map((charge, idx) => (
                        <Box
                            key={idx}
                            sx={{ mb: idx !== charges.length - 1 ? 2 : 0 }}
                        >
                            {idx > 0 && <Divider sx={{ my: 2 }} />}
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={charge.description}
                                        onChange={(e) =>
                                            handleChargeChange(
                                                idx,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        label="Units Used"
                                        type="number"
                                        value={charge.units}
                                        onChange={(e) =>
                                            handleChargeChange(
                                                idx,
                                                "units",
                                                e.target.value
                                            )
                                        }
                                        InputProps={{
                                            inputProps: { min: 0 },
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        label="Rate"
                                        type="number"
                                        value={charge.rate}
                                        onChange={(e) =>
                                            handleChargeChange(
                                                idx,
                                                "rate",
                                                e.target.value
                                            )
                                        }
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    ₹
                                                </InputAdornment>
                                            ),
                                            inputProps: { min: 0 },
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        fullWidth
                                        label="Amount"
                                        type="number"
                                        value={charge.amount.toFixed(2)}
                                        InputProps={{
                                            readOnly: true,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    ₹
                                                </InputAdornment>
                                            ),
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                    <IconButton
                                        color="error"
                                        onClick={() => removeCharge(idx)}
                                        disabled={charges.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Button
                            startIcon={<AddIcon />}
                            onClick={addCharge}
                            variant="outlined"
                            color="primary"
                            size="small"
                        >
                            Add Charge
                        </Button>
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                        >
                            Subtotal: ₹{totalAmount.toFixed(2)}
                        </Typography>
                    </Box>
                </StyledPaper>

                <TotalCard>
                    <CardContent>
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid item>
                                <Typography variant="h5">
                                    Total Amount
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4">
                                    ₹{totalAmount.toFixed(2)}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* Amount Received Field */}
                        <Box sx={{ mt: 3 }}>
                            <TextField
                                label="Amount Received"
                                type="number"
                                fullWidth
                                value={patientDetails.discount || ""}
                                onChange={(e) =>
                                    setPatientDetails((prev) => ({
                                        ...prev,
                                        discount: e.target.value,
                                    }))
                                }
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            ₹
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 0 },
                                }}
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </TotalCard>

                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        size="large"
                    >
                        Reset
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Bill"}
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default BillingForm;