import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { logoutAction } from "../../redux/Actions/authActions";
import { useThemeContext } from "../../theme-styles/themeContext";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { userAuth } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const { darkMode, toggleTheme } = useThemeContext(); // Use theme context

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundImage: darkMode
          ? "linear-gradient(195deg, #333, #777,#333)"
          : "linear-gradient(195deg, #D60BFF, #304FFE,#D60BFF)",
      }}
    >
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {userAuth?.companyName ||
            `Welcome, ${userAuth.firstName} ${userAuth.lastName}`}
        </Typography>

        {/* Theme Toggle Button */}
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar
            src={
              userAuth.profile ||
              "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
            }
            alt={userAuth.firstName}
          />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={NavLink} to="/profile">
            <AccountCircle sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <MenuItem component={NavLink} to="/update-password">
            <LockResetIcon sx={{ mr: 2 }} />
            Update Password
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleLogout()}>
            <Typography sx={{ mr: 2 }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
