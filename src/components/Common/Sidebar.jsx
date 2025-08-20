import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Collapse,
  Tooltip,
  Paper,
  Popper,
  MenuList,
  MenuItem,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  ListAlt as WorkOrdersIcon,
  Business as AssetsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Category as TypesIcon,
  CheckCircle as StatusIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, width }) => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperOpen, setPopperOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  // Update active path when location changes
  useEffect(() => {
    setActivePath(location.pathname);
    
    // Only auto-expand reports if sidebar is open AND current path is a sub-item
    if (isOpen) {
      const isReportsSubItem = menuItems
        .find(item => item.subItems)
        ?.subItems.some(subItem => subItem.path === location.pathname);
      
      if (isReportsSubItem) {
        setReportsOpen(true);
      }
    } else {
      // Keep reports closed when sidebar is collapsed
      setReportsOpen(false);
    }
  }, [location.pathname, isOpen]); // Added isOpen as dependency

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Service Request",
      icon: <CreateIcon />,
      path: "/service-request",
    },
    { 
      text: "My Work Orders", 
      icon: <WorkOrdersIcon />, 
      path: "/work-orders" 
    },
    { 
      text: "Assets", 
      icon: <AssetsIcon />, 
      path: "/assets" 
    },
    {
      text: "Reports",
      icon: <ReportsIcon />,
      path: "/reports",
      subItems: [
        { 
          text: "Work Order Types", 
          path: "/reports/types",
          icon: <TypesIcon sx={{ fontSize: "1.2rem" }} />
        },
        { 
          text: "Work Order Status", 
          path: "/reports/status",
          icon: <StatusIcon sx={{ fontSize: "1.2rem" }} />
        },
      ],
    },
    { 
      text: "Settings", 
      icon: <SettingsIcon />, 
      path: "/settings" 
    },
  ];

  // Check if a menu item is active
  const isItemActive = (item) => {
    if (item.path === activePath) return true;
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === activePath);
    }
    return false;
  };

  // Check if a sub-item is active
  const isSubItemActive = (subItem) => {
    return subItem.path === activePath;
  };

  const handleReportsToggle = () => {
    setReportsOpen(!reportsOpen);
  };

  const handleReportsHover = (event) => {
    if (!isOpen) {
      setAnchorEl(event.currentTarget);
      setPopperOpen(true);
    }
  };

  const handleReportsLeave = () => {
    setPopperOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        position: 'fixed',
        height: 'calc(100vh - 64px)',
        top: '64px',
        left: 0,
        '& .MuiDrawer-paper': {
          width: width,
          height: 'calc(100vh - 64px)',
          top: '4.6rem',
          left: 0,
          boxSizing: 'border-box',
          backgroundColor: '#1565c0',
          color: 'white',
          transition: 'width 0.3s ease',
          borderRight: 'none',
        },
      }}
    >
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                <ListItemButton
                  onClick={handleReportsToggle}
                  onMouseEnter={handleReportsHover}
                  onMouseLeave={handleReportsLeave}
                  sx={{
                    borderRadius: "4px",
                    mb: "4px",
                    backgroundColor: isItemActive(item)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <>
                      <ListItemText 
                        primary={item.text} 
                        sx={{ 
                          "& span": { 
                            fontWeight: "bold",
                            color: isItemActive(item) ? "#fff" : "rgba(255,255,255,0.9)"
                          } 
                        }} 
                      />
                      {reportsOpen ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>

                {/* Expanded sidebar menu - Only show when sidebar is open */}
                {isOpen && (
                  <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                    <Box 
                      sx={{ 
                        backgroundColor: "#fff", 
                        borderRadius: "5px",
                        mx: 1,
                        mb: 1,
                        overflow: 'hidden'
                      }}
                    >
                      <List disablePadding>
                        {item.subItems.map((subItem) => (
                          <ListItemButton
                            key={subItem.text}
                            component={Link}
                            to={subItem.path}
                            sx={{
                              mb: "2px",
                              backgroundColor: isSubItemActive(subItem)
                                ? "rgba(25, 118, 210, 0.15)"
                                : "transparent",
                              "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.1)",
                              },
                            }}
                          >
                            <ListItemIcon sx={{ 
                              color: isSubItemActive(subItem) ? "#1565c0" : "#1976d2", 
                              minWidth: "25px"
                            }}>
                              {subItem.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={subItem.text}
                              sx={{ 
                                "& span": { 
                                  fontSize: "0.9rem",
                                  color: isSubItemActive(subItem) ? "#1565c0" : "#1976d2",
                                  fontWeight: isSubItemActive(subItem) ? "bold" : "normal"
                                } 
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Box>
                  </Collapse>
                )}

                {/* Popper menu for collapsed sidebar */}
                <Popper
                  open={popperOpen && !isOpen}
                  anchorEl={anchorEl}
                  placement="right-start"
                  sx={{ zIndex: 1300 }}
                >
                  <Paper 
                    onMouseEnter={() => setPopperOpen(true)}
                    onMouseLeave={handleReportsLeave}
                    elevation={3}
                    sx={{ 
                      minWidth: 200, 
                      backgroundColor: '#1565c0',
                      color: 'white'
                    }}
                  >
                    <MenuList>
                      {item.subItems.map((subItem) => (
                        <MenuItem
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          onClick={handleReportsLeave}
                          sx={{
                            color: 'white',
                            backgroundColor: isSubItemActive(subItem)
                              ? "rgba(255,255,255,0.2)"
                              : "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ListItemIcon sx={{ color: "white", minWidth: "35px" }}>
                            {subItem.icon}
                          </ListItemIcon>
                          <Box component="span" sx={{ fontWeight: "bold" }}>
                            {subItem.text}
                          </Box>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Paper>
                </Popper>
              </>
            ) : (
              <Tooltip title={!isOpen && item.text} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "4px",
                    mb: "4px",
                    backgroundColor: isItemActive(item)
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && (
                    <ListItemText 
                      primary={item.text} 
                      sx={{ 
                        "& span": { 
                          fontWeight: "bold",
                          color: isItemActive(item) ? "#fff" : "rgba(255,255,255,0.9)"
                        } 
                      }} 
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;