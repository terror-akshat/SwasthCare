import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Box,
  Avatar,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import BedIcon from "@mui/icons-material/Bed";
import LockResetIcon from "@mui/icons-material/LockReset";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const { logout } = useAuth();

  const handleOnSearch = (e) => {
    const value = e.target.value;
    setSearchQ(value);
    onSearch(value);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const renderDesktopSearch = () => (
    <Box
      sx={{
        position: "relative",
        width: isSearchFocused ? "300px" : "200px",
        transition: "width 0.3s ease-in-out",
        display: { xs: "none", md: "block" },
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search patients, doctors..."
        value={searchQ}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        onChange={handleOnSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
            </InputAdornment>
          ),
          sx: {
            color: "#fff",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.25)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&::placeholder": {
              color: "rgba(255, 255, 255, 0.7) ",
              opacity: 1,
            },
          },
        }}
        sx={{ width: "100%" }}
      />
    </Box>
  );

  const renderMobileSearch = () => (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: theme.zIndex.appBar + 1,
        display: mobileSearchOpen ? "block" : "none",
      }}
    >
      <AppBar
        position="static"
        color="default"
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleMobileSearch}
            sx={{ mr: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <TextField
            variant="outlined"
            fullWidth
            autoFocus
            placeholder="Search patients, doctors..."
            value={searchQ}
            onChange={handleOnSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                </InputAdornment>
              ),
              sx: {
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderRadius: "20px",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.25)",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "transparent",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255, 255, 255, 0.5)",
                },
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.7) ",
                  opacity: 1,
                },
              },
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #1976d2 0%, #2196f3 100%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
          {/* Logo and Title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleMobileMenu}
                sx={{ mr: 1 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <LocalHospitalIcon
              sx={{
                mr: 1.5,
                color: "#fff",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": { opacity: 0.7 },
                  "50%": { opacity: 1 },
                  "100%": { opacity: 0.7 },
                },
              }}
            />

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.5px",
                display: { xs: "none", sm: "block" },
                textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              SwasthCare
            </Typography>

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.5px",
                display: { xs: "block", sm: "none" },
                textShadow: "0px 1px 2px rgba(0,0,0,0.2)",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              HMS
            </Typography>
          </Box>

          {/* Desktop Search */}
          {renderDesktopSearch()}

          {/* Right Side Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Mobile Search Toggle */}
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={toggleMobileSearch}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            )}

            {/* Desktop Navigation Buttons */}
            {!isMobile && (
              <>
                <Button
                  variant="contained"
                  onClick={() => navigate("/wards")}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 500,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                  }}
                  startIcon={<BedIcon />}
                >
                  Wards System
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/update")}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 500,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                  }}
                  startIcon={<LockResetIcon />}
                >
                  Update Profile
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/admin-dashboard")}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 500,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                  }}
                  startIcon={<AddBoxIcon />}
                >
                  Add Ward
                </Button>
                <Button
                  variant="contained"
                  onClick={logout}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "#fff",
                    borderRadius: "20px",
                    textTransform: "none",
                    px: 2,
                    fontWeight: 500,
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.25)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    },
                  }}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </>
            )}

            {/* Mobile Single Action Button */}
            {isMobile && !isSmallMobile && (
              <Button
                variant="contained"
                onClick={() => navigate("/wards")}
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  borderRadius: "20px",
                  textTransform: "none",
                  px: 2,
                  fontWeight: 500,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  },
                }}
                startIcon={<BedIcon />}
              >
                Wards
              </Button>
            )}

            {/* Avatar for mobile - additional options */}
            {isMobile && (
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: "#1565c0",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
                onClick={toggleMobileMenu}
              >
                A
              </Avatar>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Search Overlay */}
      {renderMobileSearch()}

      {/* Mobile Menu Drawer */}
      <Drawer 
        anchor="left" 
        open={mobileMenuOpen} 
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: {
            width: { xs: "80%", sm: 300 },
            maxWidth: "100%",
          }
        }}
      >
        <Box sx={{ p: 2, bgcolor: "#1976d2", color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocalHospitalIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              Hospital Management
            </Typography>
            <IconButton color="inherit" onClick={toggleMobileMenu} edge="end">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "#1565c0" }}>A</Avatar>
            <Typography variant="body1">Admin User</Typography>
          </Box>
        </Box>
        
        <Divider />
        
        <List sx={{ py: 0 }}>
          <ListItem button onClick={() => handleNavigation("/wards")}>
            <ListItemIcon>
              <BedIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Wards System" />
          </ListItem>
          
          <ListItem button onClick={() => handleNavigation("/update")}>
            <ListItemIcon>
              <LockResetIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Change Password & Name" />
          </ListItem>
          
          <ListItem button onClick={() => handleNavigation("/admin-dashboard")}>
            <ListItemIcon>
              <AddBoxIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Add Ward" />
          </ListItem>
        </List>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{ mt: 1 }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;