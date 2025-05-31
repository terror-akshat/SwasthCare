import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Chip,
  Snackbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Navbar from "../components/Navbar.jsx";
import { useTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate, useLocation } from "react-router-dom";

const IPDFormPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state;
  const ipdFormImage = image;
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get("id");

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const formId = React.useMemo(
    () => `OPD-${Math.floor(Math.random() * 10000)}`,
    []
  );

  const shareUrl = window.location.href;
  const shareTitle = `OPD Form ${formId}`;
  const shareText = `View OPD Form details for ${
    patientId ? `Patient ID: ${patientId}` : "patient"
  }`;

  const fetchImageAsBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  };

  const handleShareClick = async (event) => {
    try {
      const imageBlob = await fetchImageAsBlob(ipdFormImage);
      const filesArray = [
        new File([imageBlob], "ipd-form.png", { type: imageBlob.type }),
      ];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator
          .share({
            title: shareTitle,
            text: shareText,
            files: filesArray,
          })
          .then(() => {
            showSnackbar("Shared successfully");
          })
          .catch((error) => {
            console.error("Error sharing:", error);
            setShareAnchorEl(event.currentTarget);
          });
      } else {
        setShareAnchorEl(event.currentTarget);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      showSnackbar("Failed to prepare file for sharing");
    }
  };

  const handleShareMenuClose = () => {
    setShareAnchorEl(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        showSnackbar("Link copied to clipboard");
        handleShareMenuClose();
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        showSnackbar("Failed to copy link");
      });
  };

  const shareViaEmail = () => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      shareTitle
    )}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(mailtoLink);
    handleShareMenuClose();
  };

  const shareViaWhatsApp = () => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(
      `${shareTitle}: ${shareUrl}`
    )}`;
    window.open(whatsappLink);
    handleShareMenuClose();
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Function to print the OPD form image
  const printOPDImage = async () => {
    try {
      const response = await fetch(ipdFormImage, {
        method: "GET",
      });
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print OPD Form</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
              }
              img {
                max-width: 100%;
                height: auto;
              }
              @media print {
                body {
                  padding: 0;
                }
              }
            </style>
          </head>
          <body>
            <img src="${objectUrl}" alt="OPD Form" onload="window.print();" />
          </body>
        </html>
      `);

      printWindow.onafterprint = () => {
        URL.revokeObjectURL(objectUrl);
        printWindow.close();
      };
      printWindow.onunload = () => {
        URL.revokeObjectURL(objectUrl);
      };
      printWindow.document.close();
    } catch (error) {
      console.error("Error printing the image:", error);
      showSnackbar("Failed to print the form");
    }
  };

  // Function to download the OPD form image
  const handleDownload = async () => {
    try {
      const response = await fetch(ipdFormImage, {
        method: "GET",
      });
      const buffer = await response.arrayBuffer();
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ipd-form.png");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showSnackbar("Download started");
    } catch (err) {
      console.error("Download error:", err);
      showSnackbar("Failed to download the image");
    }
  };

  return (
    <Box id="body" sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Navbar />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                mr: 1,
                backgroundColor: "white",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="600">
              IPD Form Details
            </Typography>
          </Box>
          <Chip
            label={patientId ? `Patient ID: ${patientId}` : "No Patient ID"}
            color="primary"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "24px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Card
            sx={{
              flex: 2,
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">IPD Form Preview</Typography>
              <Typography variant="body2">
                Last Updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
            <CardMedia
              id="printable-area"
              component="img"
              alt="OPD Form"
              image={ipdFormImage}
              title="OPD Form"
              sx={{
                width: "100%",
                height: "auto",
                padding: "16px",
                objectFit: "contain",
                backgroundColor: "#fafafa",
              }}
            />
          </Card>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  padding: "16px",
                }}
              >
                <Typography variant="h6">Actions</Typography>
              </Box>
              <Box sx={{ padding: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                  startIcon={<DownloadIcon />}
                  fullWidth
                  sx={{
                    marginBottom: "12px",
                    borderRadius: "8px",
                    padding: "12px",
                    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.2)",
                    "&:hover": {
                      boxShadow: "0 6px 12px rgba(25, 118, 210, 0.3)",
                    },
                  }}
                >
                  Download Form
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PrintIcon />}
                  fullWidth
                  onClick={printOPDImage}
                  sx={{
                    marginBottom: "12px",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  Print Form
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<ShareIcon />}
                  fullWidth
                  onClick={handleShareClick}
                  sx={{ borderRadius: "8px", padding: "12px" }}
                >
                  Share Form
                </Button>
              </Box>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  padding: "16px",
                }}
              >
                <Typography variant="h6">Form Information</Typography>
              </Box>
              <Box sx={{ padding: "16px" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Form Type:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    IPD Admission
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Department:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    General Medicine
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Form ID:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {patientId}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2" color="text.secondary">
                    Valid Until:
                  </Typography>
                  <Typography variant="body2" fontWeight="500">
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Menu
        anchorEl={shareAnchorEl}
        open={Boolean(shareAnchorEl)}
        onClose={handleShareMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { borderRadius: "8px", minWidth: "200px", mt: 1 },
        }}
      >
        <MenuItem onClick={copyToClipboard}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={shareViaEmail}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={shareViaWhatsApp}>
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default IPDFormPage;
