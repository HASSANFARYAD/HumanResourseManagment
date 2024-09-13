// import React, { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Typography,
//   Box,
//   Collapse,
//   Card,
//   CardMedia,
//   Stack,
// } from "@mui/material";
// import {
//   Dashboard as DashboardIcon,
//   CalendarToday as CalendarTodayIcon,
//   Assessment as AssessmentIcon,
//   ExpandLess,
//   ExpandMore,
// } from "@mui/icons-material";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
// import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
// import CategoryIcon from "@mui/icons-material/Category";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ListAltIcon from "@mui/icons-material/ListAlt";

// const drawerWidthOpen = 280;
// const drawerWidthCollapsed = 60;

// const GetSideBar = ({ isOpen }) => {
//   const location = useLocation();
//   const { userAuth } = useSelector((state) => state.authentication);
//   const [hoveredItem, setHoveredItem] = useState(null);
//   const handleMouseEnter = (text) => setHoveredItem(text);
//   const handleMouseLeave = () => setHoveredItem(null);
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null);

//   const handleClick = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   const handleSubMenuClick = (subMenu) => {
//     setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
//   };

//   const isSelected = (path) => location.pathname === path;

//   useEffect(() => {
//     if (location.pathname === "/add" || location.pathname === "/categories") {
//       setOpenMenu("Manage Categories");
//     } else if (
//       location.pathname === "/add-user" ||
//       location.pathname === "/users-list"
//     ) {
//       setOpenMenu("Manage Users");
//     } else {
//       setOpenMenu(null); // Close the opened menu for other paths
//     }
//   }, [location.pathname]);

//   return (
//     <Drawer
//       variant="permanent"
//       open={isOpen}
//       sx={{
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           overflow: "visible",
//           width: isOpen ? drawerWidthOpen : drawerWidthCollapsed,
//           boxSizing: "border-box",
//           transition: "width 0.3s easeisMobile",
//           position: "fixed",
//           top: isOpen ? 50 : 70,

//           boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.2)",
//         },
//       }}
//     >
//       <Box sx={{ width: isOpen ? drawerWidthOpen : drawerWidthCollapsed }}>
//         <List>
//           <ListItem
//             sx={{
//               overflow: "hidden",
//             }}
//           >
//             <NavLink
//               to="/home"
//               style={{
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   my: 2,
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 <img
//                   src={
//                     userAuth.profile
//                       ? userAuth.profile
//                       : "https://wallpapersmug.com/download/1920x1080/abfc00/vector-design-retro-4k.jpg"
//                   }
//                   alt="logo"
//                   style={{
//                     width: isOpen ? "50px" : "40px",
//                     height: isOpen ? "50px" : "40px",
//                     borderRadius: "100%",
//                   }}
//                 />
//                 <Stack spacing={0.5} sx={{ ml: 2 }}>
//                   <Typography variant="body1">Has San</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     Email@email.com
//                   </Typography>
//                 </Stack>
//               </ListItemIcon>
//             </NavLink>
//           </ListItem>
//           <Divider />

//           <NavLink
//             to="/home"
//             style={{ textDecoration: "none", color: "inherit" }}
//           >
//             <ListItem
//               button="true"
//               sx={{
//                 position: "relative",
//                 width: isOpen ? drawerWidthOpen : drawerWidthCollapsed,
//                 backgroundColor: isSelected("/home")
//                   ? "rgba(25, 118, 210, 0.2)"
//                   : "inherit", // Highlight selected
//                 "&.hover": {
//                   overflow: "visible",
//                   backgroundColor: "rgba(0, 0, 0, 0.08)",
//                 },
//                 my: 1,
//               }}
//               onMouseEnter={() => handleMouseEnter("Dashboard")}
//               onMouseLeave={() => handleMouseLeave()}
//             >
//               <ListItemIcon>
//                 <DashboardIcon />
//               </ListItemIcon>
//               {isOpen || hoveredItem === "Dashboard" ? (
//                 <ListItemText primary="Dashboard" sx={{ margin: 0 }} />
//               ) : (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     left: drawerWidthCollapsed,
//                     visibility:
//                       hoveredItem === "Dashboard" ? "visible" : "hidden",
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     borderRadius: 1,
//                     padding: 1,
//                     boxShadow: 1,
//                     zIndex: 10,
//                     whiteSpace: "nowrap",
//                     width: drawerWidthCollapsed,
//                   }}
//                 >
//                   <Typography variant="body2">Dashboard</Typography>
//                 </Box>
//               )}
//             </ListItem>
//           </NavLink>

//           <ListItem
//             sx={{ position: "relative", my: 1 }}
//             onMouseEnter={() => handleMouseEnter("Manage Categories")}
//             onMouseLeave={() => handleMouseLeave()}
//             button="true"
//             onClick={() => handleClick("Manage Categories")}
//           >
//             <ListItemIcon>
//               <CategoryIcon />
//             </ListItemIcon>
//             {isOpen || hoveredItem === "Manage Categories" ? (
//               <ListItemText primary="Manage Categories" sx={{ margin: 0 }} />
//             ) : (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: drawerWidthCollapsed,
//                   top: 0,
//                   visibility:
//                     hoveredItem === "Manage Categories" ? "visible" : "hidden",
//                   backgroundColor: "white",
//                   borderRadius: 1,
//                   padding: 1,
//                   boxShadow: 1,
//                   zIndex: 10,
//                   width: "auto",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 <Typography variant="body2">Calendar</Typography>
//               </Box>
//             )}
//             {isOpen &&
//               (openMenu === "Manage Categories" ? (
//                 <ExpandLess />
//               ) : (
//                 <ExpandMore />
//               ))}
//           </ListItem>
//           <Collapse in={openMenu === "Manage Categories"}>
//             <List component="div" disablePadding>
//               <NavLink
//                 to="/add"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <ListItem
//                   button="true"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     position: "relative",
//                     backgroundColor: isSelected("/add")
//                       ? "rgba(25, 118, 210, 0.2)"
//                       : "inherit", // Highlight selected
//                     "&:hover .nestedItemLabel": {
//                       visibility: "visible",
//                     },
//                   }}
//                 >
//                   <ListItemIcon>
//                     <AddCircleOutlineIcon />
//                   </ListItemIcon>
//                   {isOpen || hoveredItem === "add" ? (
//                     <ListItemText primary="Add Category" />
//                   ) : (
//                     <Box
//                       className="nestedItemLabel"
//                       sx={{
//                         display: isOpen ? "none" : "block",
//                         position: "absolute",
//                         left: drawerWidthCollapsed + 20,
//                         top: 0,
//                         borderRadius: 1,
//                         padding: 1,
//                         zIndex: 10,
//                         width: "auto",
//                         whiteSpace: "nowrap",
//                         visibility:
//                           hoveredItem === "add" ? "visible" : "hidden",
//                       }}
//                     >
//                       <Typography variant="body2">Add New Category</Typography>
//                     </Box>
//                   )}
//                 </ListItem>
//               </NavLink>

//               <NavLink
//                 to="/categories"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <ListItem
//                   button="true"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     position: "relative",
//                     backgroundColor: isSelected("/categories")
//                       ? "rgba(25, 118, 210, 0.2)"
//                       : "inherit", // Highlight selected
//                     "&:hover .nestedItemLabel": {
//                       visibility: "visible",
//                     },
//                   }}
//                 >
//                   <ListItemIcon>
//                     <ListAltIcon />
//                   </ListItemIcon>
//                   {isOpen || hoveredItem === "add" ? (
//                     <ListItemText primary="Categories List" />
//                   ) : (
//                     <Box
//                       className="nestedItemLabel"
//                       sx={{
//                         display: isOpen ? "none" : "block",
//                         position: "absolute",
//                         left: drawerWidthCollapsed + 20,
//                         top: 0,
//                         borderRadius: 1,
//                         padding: 1,
//                         zIndex: 10,
//                         width: "auto",
//                         whiteSpace: "nowrap",
//                         visibility:
//                           hoveredItem === "add" ? "visible" : "hidden",
//                       }}
//                     >
//                       <Typography variant="body2">Categories List</Typography>
//                     </Box>
//                   )}
//                 </ListItem>
//               </NavLink>
//             </List>
//           </Collapse>

//           <ListItem
//             sx={{ position: "relative", my: 1 }}
//             onMouseEnter={() => handleMouseEnter("Manage Users")}
//             onMouseLeave={() => handleMouseLeave()}
//             button="true"
//             onClick={() => handleClick("Manage Users")}
//           >
//             <ListItemIcon>
//               <ManageAccountsIcon />
//             </ListItemIcon>
//             {isOpen || hoveredItem === "Manage Users" ? (
//               <ListItemText primary="Manage Users" sx={{ margin: 0 }} />
//             ) : (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   left: drawerWidthCollapsed,
//                   top: 0,
//                   visibility:
//                     hoveredItem === "Manage Users" ? "visible" : "hidden",
//                   backgroundColor: "white",
//                   borderRadius: 1,
//                   padding: 1,
//                   boxShadow: 1,
//                   zIndex: 10,
//                   width: "auto",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 <Typography variant="body2">Manage Users</Typography>
//               </Box>
//             )}
//             {isOpen &&
//               (openMenu === "Manage Users" ? <ExpandLess /> : <ExpandMore />)}
//           </ListItem>
//           <Collapse in={openMenu === "Manage Users"}>
//             <List component="div" disablePadding>
//               <NavLink
//                 to="/add-user"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <ListItem
//                   button="true"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     position: "relative",
//                     backgroundColor: isSelected("/add-user")
//                       ? "rgba(25, 118, 210, 0.2)"
//                       : "inherit", // Highlight selected
//                     "&:hover .nestedItemLabel": {
//                       visibility: "visible",
//                     },
//                   }}
//                 >
//                   <ListItemIcon>
//                     <PersonAddAltIcon />
//                   </ListItemIcon>
//                   {isOpen || hoveredItem === "Add User" ? (
//                     <ListItemText primary="Add User" />
//                   ) : (
//                     <Box
//                       className="nestedItemLabel"
//                       sx={{
//                         display: isOpen ? "none" : "block",
//                         position: "absolute",
//                         left: drawerWidthCollapsed + 20,
//                         top: 0,
//                         borderRadius: 1,
//                         padding: 1,
//                         zIndex: 10,
//                         width: "auto",
//                         whiteSpace: "nowrap",
//                         visibility:
//                           hoveredItem === "Add User" ? "visible" : "hidden",
//                       }}
//                     >
//                       <Typography variant="body2">Add User</Typography>
//                     </Box>
//                   )}
//                 </ListItem>
//               </NavLink>

//               <NavLink
//                 to="/users-list"
//                 style={{ textDecoration: "none", color: "inherit" }}
//               >
//                 <ListItem
//                   button="true"
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     position: "relative",
//                     backgroundColor: isSelected("/users-list")
//                       ? "rgba(25, 118, 210, 0.2)"
//                       : "inherit", // Highlight selected
//                     "&:hover .nestedItemLabel": {
//                       visibility: "visible",
//                     },
//                   }}
//                 >
//                   <ListItemIcon>
//                     <PeopleOutlineIcon />
//                   </ListItemIcon>
//                   {isOpen || hoveredItem === "Users List" ? (
//                     <ListItemText primary="Users List" />
//                   ) : (
//                     <Box
//                       className="nestedItemLabel"
//                       sx={{
//                         display: isOpen ? "none" : "block",
//                         position: "absolute",
//                         left: drawerWidthCollapsed + 20,
//                         top: 0,
//                         borderRadius: 1,
//                         padding: 1,
//                         zIndex: 10,
//                         width: "auto",
//                         whiteSpace: "nowrap",
//                         visibility:
//                           hoveredItem === "Users List" ? "visible" : "hidden",
//                       }}
//                     >
//                       <Typography variant="body2">Users List</Typography>
//                     </Box>
//                   )}
//                 </ListItem>
//               </NavLink>
//             </List>
//           </Collapse>
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default GetSideBar;

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
