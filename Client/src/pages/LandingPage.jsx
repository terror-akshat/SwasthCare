
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Grid,
  Card, 
  CardContent, 
  CardActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const loginOptions = [
    {
      title: 'Admin Login',
      description: 'Login as an administrator to manage hospital operations, staff, and system settings.',
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      path: '/admin-login',
      color: '#bbdefb'
    },
    {
      title: 'User Login',
      description: 'Login as a regular user to access patient records, appointments, and medical history.',
      icon: <PersonIcon sx={{ fontSize: 60, color: '#43a047' }} />,
      path: '/signin',
      color: '#c8e6c9'
    },
    {
      title: 'Master Login',
      description: 'Login with master credentials for complete system access and administrative control.',
      icon: <SecurityIcon sx={{ fontSize: 60, color: '#e53935' }} />,
      path: '/master-login',
      color: '#ffcdd2'
    }
  ];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 8
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            animation: 'fadeIn 1s ease-in-out',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <LocalHospitalIcon 
              sx={{ 
                fontSize: { xs: 60, md: 80 }, 
                color: '#1976d2',
                filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))'
              }} 
            />
          </Box>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 2,
              color: '#1a237e',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            Hospital Management System
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              maxWidth: 700, 
              mx: 'auto',
              mb: 4,
              px: 2
            }}
          >
            Streamline patient care, manage resources efficiently, and improve healthcare delivery
          </Typography>
        </Box>

        {/* Login Options Section */}
        <Grid container spacing={4} justifyContent="center">
          {loginOptions.map((option, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={index}
              sx={{
                animation: `fadeInUp ${0.3 + index * 0.2}s ease-out`,
                '@keyframes fadeInUp': {
                  '0%': { opacity: 0, transform: 'translateY(20px)' },
                  '100%': { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Card 
                elevation={4}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderRadius: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                  },
                  overflow: 'hidden'
                }}
              >
                <Box 
                  sx={{ 
                    bgcolor: option.color, 
                    py: 4, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {option.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 3 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {option.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="large"
                    onClick={() => navigate(option.path)}
                    sx={{ 
                      borderRadius: 2,
                      py: 1.2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
                      }
                    }}
                  >
                    Login
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Footer Section */}
        <Box 
          sx={{ 
            mt: 8, 
            pt: 4, 
            textAlign: 'center',
            borderTop: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <MedicalServicesIcon sx={{ color: '#1976d2', mr: 1 }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 600, color: '#1976d2' }}>
              HMS
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            @ {new Date().getFullYear()} Hospital Management System. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
