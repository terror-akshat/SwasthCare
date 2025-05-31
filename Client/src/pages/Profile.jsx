import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Input,
    Divider,
    Container,
    Menu,
    MenuItem,
    IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import IPDForm from "../pages/IPD";
import DialogForm from "../components/RegistrationForm";
import axios from "../axios";
import { Cloudinary } from "@cloudinary/url-gen/index";
import CreateOPDForm from "./OPD";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: "20px auto",
    borderRadius: "12px",
    width: "90%",
    position: "relative",
    minHeight: "80vh",
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(3),
        width: "90%",
    },
}));

const InfoRow = ({ label, value, bold }) => (
    <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={3}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
                {label}:
            </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
            <Typography
                variant="body1"
                sx={{
                    fontWeight: bold ? "bold" : "normal",
                    color: bold ? "red" : "inherit",
                }}
            >
                {value || "N/A"}
            </Typography>
        </Grid>
    </Grid>
);

const cid = new Cloudinary({
    cloud: {
        cloudName: "df7zyzkbe",
    },
});

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState({});
    const [openIPDForm, setOpenIPDForm] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [opdOpen, setOpdOpen] = useState(false);
    const [shift, setShift] = useState(false);
    const [opd, setOpd] = useState(false);
    const [ipd, setIpd] = useState(false);
    const [lab, setLab] = useState(false);
    const [avtar, setAvtar] = useState();
    const [preview, setPreview] = useState();
    const [photoUploadDialog, setPhotoUploadDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [generateOpdOpen, setGenerateOpdOpen] = useState(false); 



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `auth/get-specific-patient/${id}`
                );
                if (response.data.status === true) {
                    setPatient(response.data.patient);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [id]);

    

    // patientData object to pass to the CreateOPDForm component
    const patientData = {
      name: patient?.name || "",
      age: patient?.age || "",
      gender: patient?.gender || "",
      bp: patient?.opd?.BP || "",
      temperature: patient?.opd?.temperature || "",
      spo2: patient?.opd?.spo2 || "",
      pulseRate: patient?.opd?.pulse_rate || "",
      weight: patient?.opd?.weight || ""
    };

    console.log(patient);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(event.target.files[0]);
        previewImage(file);
    };

    const previewImage = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result);
        };
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("Select the file to upload!");
            return;
        }
        const formData = new FormData();
        formData.append("image", selectedFile);
        try {
            if (photoUploadDialog) {
                const response = await axios.post(`/uploads/avtar/${id}`, {
                    data: preview,
                });
                if (response.data.status !== "success") {
                    toast.error(response.data.message);
                    setPhotoUploadDialog(false);
                    return;
                }
                setPhotoUploadDialog(false);
                toast.success(
                    response.data.message || "Couldn't upload profile picture!"
                );
            } else if (opd) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `/uploads/upload-opd/${patient.opd?._id}`,
                        { data: preview }
                    );
                    if (response.data.status !== "success") {
                        toast.error(response.data.message);
                        setOpenDialog(false);
                        setOpd(false);
                        return;
                    }
                    setOpenDialog(false);
                    setOpd(false);
                    toast.success(
                        response.data.message || "OPD uploaded successfully!"
                    );
                    setLoading(false);
                } catch (error) {
                    toast.error(
                        error.response?.data?.message || "Couldn't upload OPD!"
                    );
                } finally {
                    setLoading(false);
                }
            } else if (ipd) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `/uploads/upload-ipd/${patient?.Ipd?._id}`,
                        {
                            data: preview,
                        }
                    );
                    if (response.data.status !== "success") {
                        toast.error(response.data.message);
                        setOpenDialog(false);
                        setIpd(false);
                        return;
                    }
                    setOpenDialog(false);
                    setIpd(false);
                    toast.success(
                        response.data.message || "IPD uploaded successfully"
                    );
                    setLoading(false);
                } catch (error) {
                    toast.error(error.response?.data?.message || "Couldn't upload IPD!");
                } finally {
                    setLoading(false);
                }
            } else if (lab) {
                try {
                    setLoading(true);
                    const response = await axios.post(
                        `/uploads/upload-lab_report/${patient?.Ipd?._id}`,
                        {
                            data: preview,
                        }
                    );
                    if (response.data.status !== "success") {
                        toast.error(response.data.message);
                        setOpenDialog(false);
                        setLab(false);
                        return;
                    }
                    setOpenDialog(false);
                    setLab(false);
                    toast.success(
                        response.data.message ||
                            "Uploaded lab reports successfully"
                    );
                    setLoading(false);
                } catch (error) {
                    toast.error(error.response?.data?.message || "Couldn't upload lab reports!");
                } finally {
                    setLoading(false);
                }
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`/uploads/get-avtar/${id}`);
                if (response.data.status === "success") {
                    setAvtar(response.data.patient.avtar.image);
                }
                if (response.data.status === "failure") {
                    console.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetch();
    }, [id]);

    const handleDischarge = async () => {
        try {
            const response = await axios.delete(`ipd/discharge/${id}`);
            if (response.data.status === "success") {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message || "Something went wrong!");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (path) => {
        navigate(path, { state: patient });
        handleMenuClose();
    };

    const handleEditPhotoClick = () => {
        setPhotoUploadDialog(true);
    };

    return (
        <>
            <Navbar />
            <Box sx={{ p: { xs: 1, sm: 3 } }}>
                <Toaster position="top-right" />
                <Container maxWidth="lg">
                    <StyledPaper elevation={3}>
                        {/* Header Section */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                mb: 4,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(-1)}
                                sx={{ width: { xs: "100%", sm: "auto" } }}
                            >
                                Back
                            </Button>

                            <Typography
                                variant="h4"
                                color="primary"
                                sx={{
                                    fontSize: { xs: "1.5rem", sm: "2rem" },
                                    textAlign: "center",
                                }}
                            >
                                Patient Profile
                            </Typography>

                            <IconButton
                                onClick={handleMenuClick}
                                sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                <MoreVertIcon />
                            </IconButton>

                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{
                                    "& .MuiPaper-root": {
                                        border: "1px solid #ccc",
                                        boxShadow:
                                            "0 3px 5px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                <MenuItem
                                    onClick={() =>
                                        handleMenuItemClick(
                                            `/view-opd-history/${patient.opd?._id}`
                                        )
                                    }
                                >
                                    View OPD
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        handleMenuItemClick(
                                            `/view-ipd-history/${patient.Ipd?._id}`
                                        )
                                    }
                                >
                                    View IPD
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        handleMenuItemClick(
                                            `/view-lab-report/${patient.Ipd?._id}`
                                        )
                                    }
                                >
                                    View Lab Report
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setGenerateOpdOpen(true); // <-- Open dialog
                                        handleMenuClose();
                                    }}
                                >
                                    Generate OPD
                                </MenuItem>
                            </Menu>
                        </Box>

                        {/* Profile Photo Section */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mb: 4,
                            }}
                        >
                            <Box sx={{ position: "relative" }}>
                                <Avatar
                                    src={cid.image(avtar).toURL() || ""}
                                    alt={patient?.name || "Profile Photo"}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        border: "3px solid #1976d2",
                                        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                                        bgcolor: patient?.profilePhoto
                                            ? "transparent"
                                            : "#1976d2",
                                        fontSize: "3rem",
                                    }}
                                >
                                    {!patient?.profilePhoto && patient?.name
                                        ? `${patient.name.split(" ")[0][0]}${
                                              patient.name.split(" ")[1]
                                                  ? patient.name.split(
                                                        " "
                                                    )[1][0]
                                                  : ""
                                          }`
                                        : null}
                                </Avatar>
                                <IconButton
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        right: 0,
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#f5f5f5",
                                        },
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                        border: "2px solid #1976d2",
                                    }}
                                    onClick={handleEditPhotoClick}
                                    size="small"
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    mt: 2,
                                    color: "primary.main",
                                    fontWeight: "medium",
                                }}
                            >
                                {patient?.name || "Patient Name"}
                            </Typography>
                        </Box>

                        {/* Patient Information Sections */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ mb: 2 }}
                            >
                                Personal Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InfoRow
                                        label="Name"
                                        value={patient?.name}
                                    />
                                    <InfoRow label="Age" value={patient?.age} />
                                    <InfoRow
                                        label="Phone"
                                        value={patient?.phone}
                                    />
                                    <InfoRow
                                        label="Email"
                                        value={patient?.email}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InfoRow
                                        label="Father's Name"
                                        value={patient?.fatherName}
                                    />
                                    <InfoRow
                                        label="Mother's Name"
                                        value={patient?.motherName}
                                    />
                                    <InfoRow
                                        label="Gender"
                                        value={patient?.gender}
                                    />
                                </Grid>
                            </Grid>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ mb: 2, mt: 4 }}
                            >
                                Medical Information
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InfoRow
                                        label="BP"
                                        value={patient.opd?.BP}
                                        bold={(() => {
                                            const bp = patient.opd?.BP || "";
                                            const [systolic, diastolic] = bp
                                                .split("/")
                                                .map(Number);
                                            return (
                                                systolic < 90 ||
                                                systolic > 140 ||
                                                diastolic < 60 ||
                                                diastolic > 90
                                            );
                                        })()}
                                    />
                                    <InfoRow
                                        label="Temperature"
                                        value={patient.opd?.temperature}
                                        bold={
                                            patient.opd?.temperature < 97 ||
                                            patient.opd?.temperature > 99
                                        }
                                    />
                                    <InfoRow
                                        label="SPO2"
                                        value={patient.opd?.spo2}
                                        bold={patient.opd?.spo2 < 95}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InfoRow
                                        label="Pulse Rate"
                                        value={patient.opd?.pulse_rate}
                                        bold={
                                            patient.opd?.pulse_rate < 60 ||
                                            patient.opd?.pulse_rate > 100
                                        }
                                    />
                                    <InfoRow
                                        label="Weight"
                                        value={patient.opd?.weight}
                                        bold={
                                            patient.opd?.weight < 10 ||
                                            patient.opd?.weight > 150
                                        }
                                    />
                                </Grid>
                            </Grid>

                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ mb: 2, mt: 4 }}
                            >
                                IPD Details
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InfoRow
                                        label="Ward"
                                        value={patient.Ipd?.currentWard}
                                    />
                                    <InfoRow
                                        label="Bed"
                                        value={patient.Ipd?.currentBed}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider sx={{ my: 4 }} />

                        {/* Action Buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 1,
                                justifyContent: "center",
                                "& > button": {
                                    flex: { xs: "1 1 100%", sm: "0 1 auto" },
                                    margin: "4px",
                                },
                            }}
                        >
                            {patient.Ipd?.currentWard && (
                                <Button
                                    onClick={() => {
                                        setShift(true);
                                        setOpenIPDForm(true);
                                    }}
                                    color="primary"
                                    variant="contained"
                                >
                                    Shift
                                </Button>
                            )}
                            <Button
                                onClick={handleDischarge}
                                color="primary"
                                variant="contained"
                            >
                                Discharge
                            </Button>
                            {!patient.Ipd?.currentWard && (
                                <Button
                                    onClick={() => setOpenIPDForm(true)}
                                    color="primary"
                                    variant="contained"
                                >
                                    IPD
                                </Button>
                            )}
                            <Button
                                onClick={() => {
                                    setOpd(true);
                                    setOpenDialog(true);
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Upload OPD
                            </Button>
                            <Button
                                onClick={() => {
                                    setIpd(true);
                                    setOpenDialog(true);
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Upload IPD
                            </Button>
                            <Button
                                onClick={() => {
                                    setLab(true);
                                    setOpenDialog(true);
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Lab Reports
                            </Button>
                            <Button
                                onClick={() => setOpdOpen(true)}
                                color="success"
                                variant="contained"
                            >
                                Edit OPD
                            </Button>
                            <Button
                                onClick={() => navigate(`/billing-form`, {state: id})}
                                color="success"
                                variant="contained"
                            >New Bill</Button>
                            <Button
                                onClick={() => navigate(`/hospital-bill`, {state: id})}
                                color="primary"
                                variant="contained"
                            >Generated Bill</Button>
                        </Box>
                    </StyledPaper>
                </Container>

                {/* File Upload Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={() => {
                        setOpenDialog(false);
                        setOpd(false);
                        setIpd(false);
                        setLab(false);
                    }}
                >
                    <DialogTitle>
                        {opd
                            ? "Upload OPD File"
                            : ipd
                            ? "Upload IPD File"
                            : "Upload Lab Report"}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ py: 2 }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {opd
                                    ? "Select an OPD file to upload"
                                    : ipd
                                    ? "Select an IPD file to upload"
                                    : "Select a lab report to upload"}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Input
                                    type="file"
                                    onChange={handleFileSelect}
                                    sx={{ mb: 2 }}
                                />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {selectedFile
                                        ? `Selected: ${selectedFile.name}`
                                        : "No file chosen"}
                                </Typography>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                setOpenDialog(false);
                                setOpd(false);
                                setIpd(false);
                                setLab(false);
                            }}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpload}
                            color="primary"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? "Uploading.." : "Upload"}
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Profile Photo Upload Dialog */}
                <Dialog
                    open={photoUploadDialog}
                    onClose={() => setPhotoUploadDialog(false)}
                >
                    <DialogTitle>Upload Profile Photo</DialogTitle>
                    <DialogContent>
                        <Box sx={{ py: 2 }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Select a new profile photo for the patient
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    sx={{ mb: 2 }}
                                />
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {selectedFile
                                        ? `Selected: ${selectedFile.name}`
                                        : "No file chosen"}
                                </Typography>
                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => setPhotoUploadDialog(false)}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpload}
                            color="primary"
                            variant="contained"
                            disabled={!selectedFile}
                        >
                            Upload Photo
                        </Button>
                    </DialogActions>
                </Dialog>

                <IPDForm
                    open={openIPDForm}
                    shift={shift}
                    handleClose={() => setOpenIPDForm(false)}
                    patient={patient}
                />

                {opdOpen && (
                    <DialogForm
                        open={opdOpen}
                        handleClose={() => setOpdOpen(false)}
                        patientData={patient}
                        isEdit={true}
                    />
                )}

                {/* OPD Dialog for Generate OPD */}
                <CreateOPDForm
                    open={generateOpdOpen}
                    handleClose={() => setGenerateOpdOpen(false)}
                    patientData={patientData}
                />
            </Box>
        </>
    );
};

export default Profile;