import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import defUserImage from "../../assets/defUser.png";

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { SERVER_URL } from "../../services/SERVER_URL";
import axios from "axios";

// Import necessary icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import EventIcon from "@mui/icons-material/Event"; // Add an event icon

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Agency Dashboard");
  const [view, setView] = useState("agency"); // 'agency' or 'event'
  const [events, setEvents] = useState([]); // Store events
  const [selectedEvent, setSelectedEvent] = useState(""); // Store selected event ID

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { logOutUser } = useContext(AuthContext);

  const getCapitalizedRole = () => {
    if (currentUser && currentUser.role) {
      return (
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
      );
    }
    return "Role";
  };

  useEffect(() => {
    // Fetch the list of events from your server
    axios
      .get(`${SERVER_URL}/event`) // Adjust the API endpoint to fetch events
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  const handleLogout = () => {
    logOutUser();
  };

  const handleEventSelect = (eventId) => {
    setSelectedEvent(eventId); // Set the selected event ID
    setView("event"); // Switch to the "Event View"
    setSelected(eventId); // Update the selected state to the event's name (optional)
  
    // Log the eventId and the URL before navigating
    console.log("Selected Event ID:", eventId);
    const url = `/contact/${eventId}`;
    console.log("Navigating to URL:", url);
  
    navigate(url); // Navigate to the desired route with the event ID
  };

  const getMenuItems = () => {
    const agencyItems = [
      {
        title: "Agency Dashboard",
        to: "/agency-dashboard",
        icon: <DashboardIcon />,
      },
      { title: "Clients", to: "/clients", icon: <PeopleAltOutlinedIcon /> },
      {
        title: "Team Members",
        to: "/team-members",
        icon: <Groups2OutlinedIcon />,
      },
      {
        title: "Event History",
        to: "/event-history",
        icon: <HistoryOutlinedIcon />,
      },
    ];

    const eventItems = [
      {
        title: "Events",
        to: "/events",
        icon: <EventIcon />, // Use the event icon
      },
      {
        title: "Contacts",
        icon: <ContactsOutlinedIcon />,
      },
      { title: "Event Links", to: "/event-links", icon: <LinkOutlinedIcon /> },
    ];

    // Add a menu item to go back to the Agency View if an event is selected
    if (selectedEvent) {
      eventItems.unshift({
        title: `Back to ${selectedEvent}`,
        onClick: () => {
          setSelectedEvent(""); // Clear the selected event
          setView("agency"); // Switch back to the "Agency View"
          setSelected("Agency View"); // Update the selected state
        },
        icon: <DashboardIcon />,
      });
    }

    return view === "agency" ? agencyItems : eventItems;
  };

  const menuItems = getMenuItems();

  const Item = ({ title, to, icon, onClick }) => (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[400] }}
      onClick={() => {
        setSelected(title);
        if (onClick) {
          onClick();
        } else if (to) {
          navigate(to);
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );

  return (
    <Box
      sx={{
        height: "100% !important",
        "& .pro-sidebar": {
          height: "100% !important",
        },
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
      <ProSidebar className="sidebar" collapsed={isCollapsed}>
        <Menu iconShape="square">
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

          <SubMenu
            title={
              !isCollapsed && (selectedEvent || view === "agency")
                ? selectedEvent || "Agency View"
                : "Select Event" // Change "Select Client" to "Select Event"
            }
            icon={<SwitchAccountIcon />}
            style={{ color: colors.grey[100] }}
          >
            {/* Add the "Agency View" option */}
            <MenuItem
              onClick={() => {
                setSelectedEvent(""); // Clear the selected event
                setView("agency"); // Switch to the "Agency View"
                setSelected("Agency View"); // Update the selected state
              }}
              style={{ color: colors.grey[400] }}
            >
              Agency View
            </MenuItem>
            {events.map((event) => (
              <MenuItem
                key={event.id}
                onClick={() => handleEventSelect(event._id)} // Handle event selection
                value={event.name}
                style={{ color: colors.grey[400] }}
              >
                {event.name}
              </MenuItem>
            ))}
          </SubMenu>

          {!isCollapsed && currentUser && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="User"
                  width="100px"
                  height="100px"
                  src={currentUser.photo || defUserImage}
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
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {getCapitalizedRole()}
                </Typography>
              </Box>
            </Box>
          )}

          {menuItems.map((item) => (
            <Item key={item.title} {...item} />
          ))}

          <Item
            title="Profile Settings"
            to="/profile-settings"
            icon={<SettingsOutlinedIcon />}
          />
          <Item
            title="Logout"
            onClick={handleLogout}
            icon={<ExitToAppOutlinedIcon />}
          />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;



