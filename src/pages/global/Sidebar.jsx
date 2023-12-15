import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import { useNavigate } from 'react-router-dom'; 
import { Link } from "react-router-dom";
import defUserImage from '../../assets/defUser.png';


import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

// Import necessary icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Agency Dashboard");

    const navigate = useNavigate(); // Hook for navigation
    const { currentUser } = useContext(UserContext); 
    const { logOutUser } = useContext(AuthContext);

    const handleLogout = () => {
        logOutUser(); 
    };

    const getCapitalizedRole = () => {
        if (currentUser && currentUser.role) {
            return currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
        }
        return "Role"; 
    };

    // Component for each menu item
    const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
    
      const navigate = useNavigate(); 
    
      return (
        <MenuItem
          active={selected === title}
          style={{ color: colors.grey[400] }}
          onClick={() => {
            setSelected(title);
            if (onClick) {
              onClick(); 
            } else {
              navigate(to); 
            }
          }}
          icon={icon}
        >
          <Typography>{title}</Typography>
        </MenuItem>
      );
    };
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOpenOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[500]}>
                                    E3-CRM
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOpenOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && currentUser && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="p"
                                    width="100px"
                                    height="100px"
                                    src={defUserImage}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                                
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[400]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {currentUser.firstName} {currentUser.lastName} {/* Display user's name */}
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    {getCapitalizedRole()} {/* Display user's role */}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        {/* Menu Items */}
                        <Item title="Agency Dashboard" to="/agency-dashboard" icon={<DashboardIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Clients" to="/clients" icon={<PeopleAltOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Team Members" to="/team-members" icon={<Groups2OutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Event History" to="/event-history" icon={<HistoryOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Event Dashboard" to="/event-dashboard" icon={<DashboardIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Event Information" to="/event-name" icon={<EventNoteOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Registrants" to="/customers" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Analytics" to="/analytics" icon={<AnalyticsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Event Links" to="/event-links" icon={<LinkOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Profile Settings" to="/profile-settings" icon={<SettingsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        <Item title="Logout" 
                        onClick={handleLogout} 
                        icon={<ExitToAppOutlinedIcon />} 
                        selected={selected} 
                        setSelected={setSelected} />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
