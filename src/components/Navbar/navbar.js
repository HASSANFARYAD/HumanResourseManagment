import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockResetIcon from "@mui/icons-material/LockReset";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../../theme-styles/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/Actions/authActions";
import { NavLink } from "react-router-dom";
import { getNotifications } from "../../redux/Actions/notificationActions";
import NotificaltionPanel from "../Notification/notificationPanel";

const Navbar = ({ toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unReadCount, setUnReadCount] = useState(0);
  const [isUpdate, setUpdate] = useState(false);
  const { userAuth } = useSelector((state) => state.authentication);
  const { darkMode, toggleTheme } = useThemeContext();
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationOpen = (event) =>
    setNotificationAnchorEl(event.currentTarget);
  const handleNotificationClose = () => setNotificationAnchorEl(null);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  const fetchNotifications = async () => {
    try {
      const response = await dispatch(getNotifications());

      if (getNotifications.fulfilled.match(response)) {
        const { records, unreadCount } = response.payload;
        setNotifications(records); // Setting the notifications list
        setUnReadCount(unreadCount); // Setting unread count
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setUpdate(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [dispatch]);

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

        {/* Notification Icon */}
        <IconButton color="inherit" onClick={handleNotificationOpen}>
          <Badge
            badgeContent={unReadCount > 9 ? "9+" : unReadCount}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={notificationAnchorEl}
          open={Boolean(notificationAnchorEl)}
          onClose={handleNotificationClose}
          sx={{}}
          PaperProps={{
            style: {
              width: "415px",
            },
          }}
        >
          <MenuItem
            disabled
            sx={{
              borderBottom: "1px solid #3e3e3e",
              paddingTop: 0,
              paddingBottom: 0,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Notification Center
            </Typography>
          </MenuItem>
          {notifications ? (
            <NotificaltionPanel
              key={JSON.stringify(notifications)}
              notifications={notifications}
              handleNotificationPanel={fetchNotifications}
              setUnReadCount={setUnReadCount}
            />
          ) : (
            <MenuItem>No new notifications</MenuItem>
          )}
        </Menu>

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
          <MenuItem onClick={handleLogout}>
            <Typography sx={{ mr: 2 }}>Logout</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
