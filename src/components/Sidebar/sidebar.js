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
  Collapse,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { menuItems } from "../../utils/_sidbarMenu";
import { useThemeContext } from "../../theme-styles/themeContext";

const drawerWidthOpen = 280;
const drawerWidthCollapsed = 60;

// Dynamic Sidebar Data

const GetSideBar = ({ isOpen }) => {
  const location = useLocation();
  const { userAuth } = useSelector((state) => state.authentication);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleMouseEnter = (text) => setHoveredItem(text);
  const handleMouseLeave = () => setHoveredItem(null);

  const handleClick = (menuTitle) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle);
  };

  const isSelected = (path) => location.pathname === path;

  const darkMode = useThemeContext();

  useEffect(() => {
    // Open specific menu based on the URL path
    if (
      location.pathname.startsWith("/add-categories") ||
      location.pathname.startsWith("/categories")
    ) {
      setOpenMenu("Manage Categories");
    } else if (
      location.pathname.startsWith("/add-user") ||
      location.pathname.startsWith("/users-list")
    ) {
      setOpenMenu("Manage Users");
    } else {
      setOpenMenu(null);
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
          transition: "width 0.3s ease",
          position: "fixed",
          top: isOpen ? 50 : 70,
          boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.2)",
          backgroundImage: darkMode
            ? "linear-gradient(90deg, #333, #555, #333)"
            : "linear-gradient(195deg, #D60BFF, #304FFE,#D60BFF)",
        },
      }}
    >
      <Box sx={{ width: isOpen ? drawerWidthOpen : drawerWidthCollapsed }}>
        <List>
          {/* User Info Section */}
          <ListItem sx={{ overflow: "hidden" }}>
            <NavLink
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemIcon
                sx={{ my: 2, display: "flex", alignItems: "center" }}
              >
                <img
                  src={userAuth.profile || "default_image_url.jpg"}
                  alt="Profile"
                  style={{
                    width: isOpen ? "50px" : "40px",
                    height: isOpen ? "50px" : "40px",
                    borderRadius: "100%",
                  }}
                />
                {isOpen && (
                  <Stack spacing={0.5} sx={{ ml: 2 }}>
                    <Typography variant="body1">Has San</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email@email.com
                    </Typography>
                  </Stack>
                )}
              </ListItemIcon>
            </NavLink>
          </ListItem>
          <Divider />

          {/* Dynamic Menu Rendering */}
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => (item.subItems ? handleClick(item.title) : null)}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={() => handleMouseLeave()}
                sx={{
                  backgroundColor: isSelected(item.path)
                    ? "rgba(25, 118, 210, 0.2)"
                    : "inherit",
                  my: 1,
                }}
              >
                <NavLink
                  to={item.path || "#"}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {(isOpen || hoveredItem === item.title) && (
                    <ListItemText primary={item.title} />
                  )}
                  {isOpen &&
                    item.subItems &&
                    (openMenu === item.title ? <ExpandLess /> : <ExpandMore />)}
                </NavLink>
              </ListItem>

              {/* Submenu Items */}
              {item.subItems && (
                <Collapse
                  in={openMenu === item.title}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        to={subItem.path}
                        key={subIndex}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <ListItem
                          button
                          sx={{
                            pl: 4,
                            backgroundColor: isSelected(subItem.path)
                              ? "rgba(25, 118, 210, 0.2)"
                              : "inherit",
                          }}
                        >
                          <ListItemIcon>{subItem.icon}</ListItemIcon>
                          {(isOpen || hoveredItem === subItem.title) && (
                            <ListItemText primary={subItem.title} />
                          )}
                        </ListItem>
                      </NavLink>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default GetSideBar;
