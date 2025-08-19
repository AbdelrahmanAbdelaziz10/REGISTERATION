import { useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Create as CreateIcon,
  ListAlt as WorkOrdersIcon,
  Business as AssetsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Sidebar = ({ isOpen, width }) => {
  const [reportsOpen, setReportsOpen] = useState(true);

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      path: "/dashboard",
      active: true, // Matches your design image
    },
    {
      text: "Service Request",
      icon: <CreateIcon />,
      path: "/service-request",
    },
    { text: "My Work Orders", icon: <WorkOrdersIcon />, path: "/work-orders" },
    { text: "Assets", icon: <AssetsIcon />, path: "/assets" },
    {
      text: "Reports",
      icon: <ReportsIcon />,
      subItems: [
        { text: "Work Order Types", path: "/reports/types" },
        { text: "Work Order Status", path: "/reports/status" },
      ],
    },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        position: 'fixed',
        height: 'calc(100vh - 64px)', // Subtract navbar height
        top: '64px', // Start below navbar
        left: 0,
        '& .MuiDrawer-paper': {
          width: width,
          height: 'calc(100vh - 64px)', // Subtract navbar height
          top: '4.6rem', // Start below navbar
          left: 0,
          boxSizing: 'border-box',
          backgroundColor: '#1565c0',
          color: 'white',
          transition: 'width 0.3s ease',
          borderRight: 'none', // Remove default border
        },
      }}
    >

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.text}>
            {item.subItems ? (
              <>
                <Tooltip title={!isOpen && item.text} placement="right">
                  <ListItemButton
                    onClick={() => setReportsOpen(!reportsOpen)}
                    sx={{
                      borderRadius: "4px",
                      mb: "4px",
                      backgroundColor: item.active
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
                        <ListItemText primary={item.text} />
                        {/* Expand/collapse icon would go here */}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {isOpen && (
                  <Collapse in={reportsOpen} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 4 }}>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          sx={{
                            borderRadius: "4px",
                            mb: "4px",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={subItem.text}
                            sx={{ "& span": { fontSize: "0.9rem" } }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            ) : (
              <Tooltip title={!isOpen && item.text} placement="right">
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    borderRadius: "4px",
                    mb: "4px",
                    backgroundColor: item.active
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: "40px" }}>
                    {item.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={item.text} />}
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
