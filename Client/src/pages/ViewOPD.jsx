import React, { useState, useRef } from 'react';
import { 
  Button, 
  Card, 
  CardMedia, 
  Typography, 
  Box, 
  Paper,
  Divider,
  IconButton,
  Chip,
  Snackbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import Navbar from '../components/Navbar.jsx';
import { useTheme } from '@mui/material/styles';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate, useLocation } from 'react-router-dom';

const OPDFormPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const image = location.state;
  const opdFormImage = image;
  const queryParams = new URLSearchParams(location.search);
  const patientId = queryParams.get('id');

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);

  const formId = React.useMemo(() => `OPD-${Math.floor(Math.random() * 10000)}`, []);
  const printImageRef = useRef(null);

  const shareUrl = window.location.href;
  const shareTitle = `OPD Form ${formId}`;
  const shareText = `View OPD Form details for ${patientId ? `Patient ID: ${patientId}` : 'patient'}`;

  const fetchImageAsBlob = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
  };

  const handleShareClick = async (event) => {
    try {
      const imageBlob = await fetchImageAsBlob(opdFormImage);
      const filesArray = [
        new File([imageBlob], 'opd-form.png', { type: imageBlob.type })
      ];

      if (navigator.canShare && navigator.canShare({ files: filesArray })) {
        navigator.share({
          title: shareTitle,
          text: shareText,
          files: filesArray,
        })
          .then(() => {
            showSnackbar('Shared successfully');
          })
          .catch((error) => {
            console.error('Error sharing:', error);
            setShareAnchorEl(event.currentTarget);
          });
      } else {
        setShareAnchorEl(event.currentTarget);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      showSnackbar('Failed to prepare file for sharing');
    }
  };

  const handleShareMenuClose = () => {
    setShareAnchorEl(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showSnackbar('Link copied to clipboard');
        handleShareMenuClose();
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        showSnackbar('Failed to copy link');
      });
  };

  const shareViaEmail = () => {
    const mailtoLink = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(mailtoLink);
    handleShareMenuClose();
  };

  const shareViaWhatsApp = () => {
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`${shareTitle}: ${shareUrl}`)}`;
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

  // Function to download the OPD form image
  const handleDownload = async () => {
    try {
      const response = await fetch(opdFormImage, {
        method: "GET",
      });
      const buffer = await response.arrayBuffer();
      const url = window.URL.createObjectURL(new Blob([buffer]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "opd-form.png");
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
    <Box id='body' sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Navbar />
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 1, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', '&:hover': { backgroundColor: '#f0f0f0' } }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" fontWeight="600">
              OPD Form Details
            </Typography>
          </Box>
          <Chip label={patientId ? `Patient ID: ${patientId}` : "No Patient ID"} color="primary" variant="outlined" />
        </Box>

        <Box sx={{ display: 'flex', gap: '24px', flexDirection: { xs: 'column', md: 'row' } }}>
          <Card sx={{ flex: 2, borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' } }}>
            <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">OPD Form Preview</Typography>
              <Typography variant="body2">Last Updated: {new Date().toLocaleDateString()}</Typography>
            </Box>
            <Box>
              <CardMedia
                ref={printImageRef}
                id='printable-area'
                component="img"
                alt="OPD Form"
                image={opdFormImage}
                title="OPD Form"
                sx={{ width: '100%', height: 'auto', padding: '16px', objectFit: 'contain', backgroundColor: '#fafafa' }}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                  Loading OPD Form image...
                </Typography>
              )}
              {/* Hidden elements that will only show when printing - REMOVED */}
            </Box>
          </Card>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Paper elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '16px' }}>
                <Typography variant="h6">Actions</Typography>
              </Box>
              <Box sx={{ padding: '16px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                  startIcon={<DownloadIcon />}
                  fullWidth
                  sx={{ marginBottom: '12px', borderRadius: '8px', padding: '12px', boxShadow: '0 4px 8px rgba(25, 118, 210, 0.2)', '&:hover': { boxShadow: '0 6px 12px rgba(25, 118, 210, 0.3)' } }}
                >
                  Download Form
                </Button>
                {/* Print button removed */}
                <Button variant="outlined" color="info" startIcon={<ShareIcon />} fullWidth onClick={handleShareClick} sx={{ borderRadius: '8px', padding: '12px' }}>
                  Share Form
                </Button>
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              <Box sx={{ backgroundColor: theme.palette.primary.main, color: 'white', padding: '16px' }}>
                <Typography variant="h6">Form Information</Typography>
              </Box>
              <Box sx={{ padding: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Form Type:</Typography>
                  <Typography variant="body2" fontWeight="500">OPD Consultation</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Department:</Typography>
                  <Typography variant="body2" fontWeight="500">General Medicine</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">Form ID:</Typography>
                  <Typography variant="body2" fontWeight="500">{formId}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">Valid Until:</Typography>
                  <Typography variant="body2" fontWeight="500">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Menu anchorEl={shareAnchorEl} open={Boolean(shareAnchorEl)} onClose={handleShareMenuClose} PaperProps={{ elevation: 3, sx: { borderRadius: '8px', minWidth: '200px', mt: 1 } }}>
        <MenuItem onClick={copyToClipboard}>
          <ListItemIcon><ContentCopyIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Copy Link</ListItemText>
        </MenuItem>
        <MenuItem onClick={shareViaEmail}>
          <ListItemIcon><EmailIcon fontSize="small" /></ListItemIcon>
          <ListItemText>Email</ListItemText>
        </MenuItem>
        <MenuItem onClick={shareViaWhatsApp}>
          <ListItemIcon><WhatsAppIcon fontSize="small" /></ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>
      </Menu>

      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </Box>
  );
};

export default OPDFormPage;