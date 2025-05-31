import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const CreateOPDForm = ({ open, handleClose, patientData }) => {
  // Add print handler for better mobile compatibility
  const handlePrint = () => {
    // Detect if the user is on a mobile device by checking the User-Agent string
    // This checks for common mobile device identifiers in the browser's user agent
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Log detection for debugging
    console.log("Device detection - Mobile:", isMobile, "User Agent:", navigator.userAgent);
    
    if (isMobile) {
      // On mobile, we'll ensure the content is properly scaled
      const printContent = document.getElementById('printable-area');
      const originalOverflow = document.body.style.overflow;
      
      // Prepare for print
      document.body.style.overflow = 'visible';
      
      // Some mobile browsers benefit from a slight delay before printing
      setTimeout(() => {
        // Print
        window.print();
        
        // Restore
        document.body.style.overflow = originalOverflow;
      }, 300);
    } else {
      // Standard print for desktop
      window.print();
    }
  };
  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }
      }}
    >
      <div id="printable-area">
        {/* <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: "18px", sm: "24px" },
            letterSpacing: 1,
            pt: 3,
            pb: 2
          }}
        >
          OPD CONSULTATION FORM
        </DialogTitle> */}
        
        <DialogContent>
          <Box sx={{ 
            display: "flex", 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            mb: 3 
          }}>
            <TextField
              label="Patient's Name"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={patientData?.name || ""}
              InputProps={{
                sx: { 
                  borderRadius: 1,
                  '& .MuiInputBase-input': {
                    overflow: 'visible',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'normal',
                    // Allow text to wrap within the field if needed
                    wordWrap: 'break-word'
                  }
                }
              }}
              // Ensure tooltip displays full name on hover if truncated
              title={patientData?.name || ""}
            />
            <TextField
              label="Age/Sex"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={`${patientData?.age || ""} / ${patientData?.gender || ""}`}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
            <TextField
              label="Date"
              variant="outlined"
              fullWidth
              margin="dense"
              size="small"
              value={new Date().toLocaleDateString()}
              InputProps={{
                sx: { borderRadius: 1 }
              }}
            />
          </Box>

          <Box sx={{ 
            display: "flex", 
            flexWrap: "wrap",
            gap: 2,
            mb: 3,
            // Improve mobile layout
            justifyContent: { xs: 'space-between', md: 'flex-start' }
          }}>
            <TextField
              label="B.P."
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: 'calc(33% - 16px)', md: '16%' } }}
              value={patientData?.bp || ""}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  fontWeight: (() => {
                    const bp = patientData?.bp || "";
                    const [systolic, diastolic] = bp.split("/").map(Number);
                    return systolic < 90 || systolic > 140 || diastolic < 60 || diastolic > 90 ? "bold" : "normal";
                  })(),
                },
              }}
            />
            <TextField
              label="Temp"
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: 'calc(33% - 16px)', md: '16%' } }}
              value={patientData?.temperature || ""}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  fontWeight: patientData?.temperature < 97 || patientData?.temperature > 99 ? "bold" : "normal",
                },
              }}
            />
            <TextField
              label="SPO2"
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: 'calc(33% - 16px)', md: '16%' } }}
              value={patientData?.spo2 || ""}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  fontWeight: patientData?.spo2 < 95 ? "bold" : "normal", 
                },
              }}
            />
            <TextField
              label="Pulse Rate"
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: 'calc(33% - 16px)', md: '16%' } }}
              value={patientData?.pulseRate || ""}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  fontWeight: patientData?.pulseRate < 60 || patientData?.pulseRate > 100 ? "bold" : "normal", 
                },
              }}
            />
            <TextField
              label="Weight"
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: 'calc(33% - 16px)', md: '16%' } }}
              value={patientData?.weight || ""}
              InputProps={{
                sx: {
                  borderRadius: 1,
                  fontWeight: patientData?.weight < 10 || patientData?.weight > 150 ? "bold" : "normal",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: 1,
              minHeight: "50vh", // Increased from 40vh to 50vh
              p: 3,
              mt: 2,
              backgroundColor: 'rgba(0,0,0,0.01)'
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Rx (Prescription & Notes):
            </Typography>
            <Box sx={{ 
              minHeight: "55vh", // Increased from 36vh to 46vh
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #ccc 31px, #ccc 32px)',
              backgroundPosition: '0 1.2em',
              lineHeight: '32px',
              p: 1
            }}
            id="rx-area"
            >
            </Box>
          </Box>

          <Box sx={{ 
            textAlign: "right", 
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(0,0,0,0.1)'
          }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Signature of Doctor
            </Typography>
          </Box>
        </DialogContent>
      </div>

      <Divider />
      
      <DialogActions sx={{ 
        display: "flex", 
        justifyContent: "space-between",
        p: 2
      }}>
        <Button 
          onClick={handleClose} 
          variant="outlined" 
          color="secondary"
          sx={{ borderRadius: 1 }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePrint}
          sx={{ borderRadius: 1 }}
        >
          Print OPD Form
        </Button>
      </DialogActions>

      <style>
      {`
        @media print {
          @page {
            size: auto;
            margin: 10mm;
          }
          html, body {
            width: auto !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
          }
          #printable-area {
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            margin: 0 auto !important;
            background: white !important;
            overflow: visible !important;
            box-sizing: border-box;
            font-size: 10pt;
          }
          /* Hide buttons and dialog actions */
          button, .MuiDialogActions-root {
            display: none !important;
          }
          /* Force text fields to display properly */
          .MuiTextField-root, .MuiOutlinedInput-root, .MuiFormControl-root {
            display: block !important;
            page-break-inside: avoid !important;
          }
          /* Ensure content fits on page */
          .MuiDialogContent-root {
            padding: 8px 16px !important;
          }
          /* Make sure patient name shows fully in the printed version */
          .MuiOutlinedInput-input {
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
          }
          /* Ensure vital signs appear on one line on mobile */
          @media screen and (max-width: 600px) {
            #printable-area .MuiBox-root {
              display: block !important;
              width: 100% !important;
            }
          }
          /* Ensure Rx area is prominent on the print */
          #rx-area {
            min-height: 70% !important;
            page-break-inside: avoid !important;
          }
          ::-webkit-scrollbar {
            display: none;
          }
        }
      `}
      </style>
    </Dialog>
  );
};

export default CreateOPDForm;