import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  CalendarToday as CalendarTodayIcon,
  Assessment as AssessmentIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

const drawerWidthOpen = 280;
const drawerWidthCollapsed = 60;

const GetSideBar = ({ isOpen }) => {
  const location = useLocation();
  const { userAuth } = useSelector((state) => state.authentication);
  const [hoveredItem, setHoveredItem] = useState(null);
  const handleMouseEnter = (text) => setHoveredItem(text);
  const handleMouseLeave = () => setHoveredItem(null);
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleClick = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleSubMenuClick = (subMenu) => {
    setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
  };

  const isSelected = (path) => location.pathname === path;

  useEffect(() => {
    if (location.pathname === "/add") {
      setOpenMenu("Manage Categories");
    } else if (
      location.pathname === "/add-user" ||
      location.pathname === "/users-list"
    ) {
      setOpenMenu("Manage Users");
    } else {
      setOpenMenu(null); // Close the opened menu for other paths
    }
  }, [location.pathname]);

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          overflow: "visible",
          width: isOpen ? drawerWidthOpen : drawerWidthCollapsed,
          boxSizing: "border-box",
          transition: "width 0.3s easeisMobile",
          position: "fixed",
          top: isOpen ? 50 : 70,

          boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Box sx={{ width: isOpen ? drawerWidthOpen : drawerWidthCollapsed }}>
        <List>
          <ListItem
            sx={{
              overflow: "hidden",
            }}
          >
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon
                sx={{
                  my: 2,
                }}
              >
                <img
                  src={
                    userAuth.profile
                      ? userAuth.profile
                      : "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
                  }
                  alt="logo"
                  style={{ width: "100%", height: "auto" }}
                />
              </ListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={<Typography variant="h6">My Fertility</Typography>}
                />
              )}
            </NavLink>
          </ListItem>
          <Divider />

          <NavLink
            to="/home"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              button
              sx={{
                position: "relative",
                width: isOpen ? drawerWidthOpen : drawerWidthCollapsed,
                backgroundColor: isSelected("/home")
                  ? "rgba(25, 118, 210, 0.2)"
                  : "inherit", // Highlight selected
                "&.hover": {
                  overflow: "visible",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
                my: 1,
              }}
              onMouseEnter={() => handleMouseEnter("Dashboard")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              {isOpen || hoveredItem === "Dashboard" ? (
                <ListItemText primary="Dashboard" sx={{ margin: 0 }} />
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    left: drawerWidthCollapsed,
                    visibility:
                      hoveredItem === "Dashboard" ? "visible" : "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 1,
                    padding: 1,
                    boxShadow: 1,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    width: drawerWidthCollapsed,
                  }}
                >
                  <Typography variant="body2">Dashboard</Typography>
                </Box>
              )}
            </ListItem>
          </NavLink>

          <NavLink
            to="preview-Link"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem
              button
              sx={{
                position: "relative",
                width: isOpen ? drawerWidthOpen : drawerWidthCollapsed,
                backgroundColor: isSelected("/preview-Link")
                  ? "rgba(25, 118, 210, 0.2)"
                  : "inherit", // Highlight selected
                "&.hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
                my: 1,
              }}
              onMouseEnter={() => handleMouseEnter("PreviewLink")}
              onMouseLeave={() => handleMouseLeave()}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              {isOpen || hoveredItem === "PreviewLink" ? (
                <ListItemText primary="PreviewLink" sx={{ margin: 0 }} />
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    left: drawerWidthCollapsed,
                    visibility:
                      hoveredItem === "PreviewLink" ? "visible" : "hidden",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 1,
                    padding: 1,
                    boxShadow: 1,
                    zIndex: 10,
                    whiteSpace: "nowrap",
                    width: drawerWidthCollapsed,
                  }}
                >
                  <Typography variant="body2">Preview Link</Typography>
                </Box>
              )}
            </ListItem>
          </NavLink>

          <ListItem
            sx={{ position: "relative", my: 1 }}
            onMouseEnter={() => handleMouseEnter("Manage Categories")}
            onMouseLeave={() => handleMouseLeave()}
            button
            onClick={() => handleClick("Manage Categories")}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            {isOpen || hoveredItem === "Manage Categories" ? (
              <ListItemText primary="Manage Categories" sx={{ margin: 0 }} />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  left: drawerWidthCollapsed,
                  top: 0,
                  visibility:
                    hoveredItem === "Manage Categories" ? "visible" : "hidden",
                  backgroundColor: "white",
                  borderRadius: 1,
                  padding: 1,
                  boxShadow: 1,
                  zIndex: 10,
                  width: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="body2">Calendar</Typography>
              </Box>
            )}
            {isOpen &&
              (openMenu === "Manage Categories" ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              ))}
          </ListItem>
          <Collapse in={openMenu === "Manage Categories"}>
            <List component="div" disablePadding>
              <NavLink
                to="/add"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: isSelected("/add")
                      ? "rgba(25, 118, 210, 0.2)"
                      : "inherit", // Highlight selected
                    "&:hover .nestedItemLabel": {
                      visibility: "visible",
                    },
                  }}
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  {isOpen || hoveredItem === "add" ? (
                    <ListItemText primary="Add Category" />
                  ) : (
                    <Box
                      className="nestedItemLabel"
                      sx={{
                        display: isOpen ? "none" : "block",
                        position: "absolute",
                        left: drawerWidthCollapsed + 20,
                        top: 0,
                        borderRadius: 1,
                        padding: 1,
                        zIndex: 10,
                        width: "auto",
                        whiteSpace: "nowrap",
                        visibility:
                          hoveredItem === "add" ? "visible" : "hidden",
                      }}
                    >
                      <Typography variant="body2">
                        Today's Appointments
                      </Typography>
                    </Box>
                  )}
                </ListItem>
              </NavLink>

              <ListItem
                button
                onClick={() => handleSubMenuClick("UpcomingAppointments")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  "&:hover .nestedItemLabel": {
                    visibility: "visible",
                  },
                }}
              >
                <ListItemIcon>
                  <AssessmentIcon />
                </ListItemIcon>
                {isOpen || hoveredItem === "UpcomingAppointments" ? (
                  <ListItemText primary="Upcoming Appointments" />
                ) : (
                  <Box
                    className="nestedItemLabel"
                    sx={{
                      display: isOpen ? "none" : "block",
                      position: "absolute",
                      left: drawerWidthCollapsed + 20,
                      top: 0,
                      borderRadius: 1,
                      padding: 1,
                      zIndex: 10,
                      width: "auto",
                      whiteSpace: "nowrap",
                      visibility:
                        hoveredItem === "UpcomingAppointments"
                          ? "visible"
                          : "hidden",
                    }}
                  >
                    <Typography variant="body2">
                      Upcoming Appointments
                    </Typography>
                  </Box>
                )}
                {isOpen &&
                  (openSubMenu === "UpcomingAppointments" ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  ))}
              </ListItem>
              <Collapse in={openSubMenu === "UpcomingAppointments"}>
                <List component="div" disablePadding>
                  <ListItem button sx={{ paddingLeft: 4 }}>
                    <ListItemText primary="Detail 1" />
                  </ListItem>
                  <ListItem button sx={{ paddingLeft: 4 }}>
                    <ListItemText primary="Detail 2" />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Collapse>

          <ListItem
            sx={{ position: "relative", my: 1 }}
            onMouseEnter={() => handleMouseEnter("Manage Users")}
            onMouseLeave={() => handleMouseLeave()}
            button
            onClick={() => handleClick("Manage Users")}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            {isOpen || hoveredItem === "Manage Users" ? (
              <ListItemText primary="Manage Users" sx={{ margin: 0 }} />
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  left: drawerWidthCollapsed,
                  top: 0,
                  visibility:
                    hoveredItem === "Manage Users" ? "visible" : "hidden",
                  backgroundColor: "white",
                  borderRadius: 1,
                  padding: 1,
                  boxShadow: 1,
                  zIndex: 10,
                  width: "auto",
                  whiteSpace: "nowrap",
                }}
              >
                <Typography variant="body2">Manage Users</Typography>
              </Box>
            )}
            {isOpen &&
              (openMenu === "Manage Users" ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={openMenu === "Manage Users"}>
            <List component="div" disablePadding>
              <NavLink
                to="/add-user"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: isSelected("/add-user")
                      ? "rgba(25, 118, 210, 0.2)"
                      : "inherit", // Highlight selected
                    "&:hover .nestedItemLabel": {
                      visibility: "visible",
                    },
                  }}
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  {isOpen || hoveredItem === "Add User" ? (
                    <ListItemText primary="Add User" />
                  ) : (
                    <Box
                      className="nestedItemLabel"
                      sx={{
                        display: isOpen ? "none" : "block",
                        position: "absolute",
                        left: drawerWidthCollapsed + 20,
                        top: 0,
                        borderRadius: 1,
                        padding: 1,
                        zIndex: 10,
                        width: "auto",
                        whiteSpace: "nowrap",
                        visibility:
                          hoveredItem === "Add User" ? "visible" : "hidden",
                      }}
                    >
                      <Typography variant="body2">Add User</Typography>
                    </Box>
                  )}
                </ListItem>
              </NavLink>

              <NavLink
                to="/users-list"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    backgroundColor: isSelected("/users-list")
                      ? "rgba(25, 118, 210, 0.2)"
                      : "inherit", // Highlight selected
                    "&:hover .nestedItemLabel": {
                      visibility: "visible",
                    },
                  }}
                >
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  {isOpen || hoveredItem === "Users List" ? (
                    <ListItemText primary="Users List" />
                  ) : (
                    <Box
                      className="nestedItemLabel"
                      sx={{
                        display: isOpen ? "none" : "block",
                        position: "absolute",
                        left: drawerWidthCollapsed + 20,
                        top: 0,
                        borderRadius: 1,
                        padding: 1,
                        zIndex: 10,
                        width: "auto",
                        whiteSpace: "nowrap",
                        visibility:
                          hoveredItem === "Users List" ? "visible" : "hidden",
                      }}
                    >
                      <Typography variant="body2">Users List</Typography>
                    </Box>
                  )}
                </ListItem>
              </NavLink>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default GetSideBar;
