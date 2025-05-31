import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Information_Not_Found = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f5f5f5'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            textAlign: 'center',
            padding: '2rem',
            maxWidth: '600px'
          }}
        >
          <motion.div variants={childVariants}>
            <ErrorOutlineIcon 
              sx={{ 
                fontSize: '100px', 
                color: 'primary.main',
                mb: 3
              }} 
            />
          </motion.div>

          <motion.div variants={childVariants}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                mb: 2,
                color: 'primary.main',
                fontWeight: 'bold'
              }}
            >
              Information Not Found
            </Typography>
          </motion.div>

          <motion.div variants={childVariants}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 4,
                color: 'text.secondary'
              }}
            >
              We couldn't find the information you're looking for. 
              This might be because the data has been moved or doesn't exist.
            </Typography>
          </motion.div>

          <motion.div variants={childVariants}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 8px rgba(0,0,0,0.15)',
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              Go Back
            </Button>
          </motion.div>
        </motion.div>
      </Box>
    </>
  );
};

export default Information_Not_Found;