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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Agency Dashboard");
  const [view, setView] = useState("agency"); // 'agency' or 'event'
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const { logOutUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the list of clients from your server
    axios
      .get(`${SERVER_URL}/client`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  const handleLogout = () => {
    logOutUser();
  };

  const getCapitalizedRole = () => {
    if (currentUser && currentUser.role) {
      return (
        currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
      );
    }
    return "Role";
  };

  const handleToggleView = () => {
    setView(view === "agency" ? "event" : "agency");
    setSelectedClient(""); // Reset selected client when switching views
  };

  const handleClientChange = (event) => {
    const selectedClientName = event.target.value;
    setSelectedClient(selectedClientName);
    setView("event"); // Switch to the "Event View"
    setSelected(selectedClientName); // Update the selected state
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
        icon: <DashboardIcon />,
      },
      {
        title: "Contacts",
        to: "/contacts",
        icon: <ContactsOutlinedIcon />,
      },
      { title: "Event Links", to: "/event-links", icon: <LinkOutlinedIcon /> },
    ];

    // Add a menu item to go back to the Agency View if a client is selected
    if (selectedClient) {
      eventItems.unshift({
        title: `Back to ${selectedClient}`,
        onClick: () => {
          setSelectedClient(""); // Clear the selected client
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
              !isCollapsed && (selectedClient || view === "agency")
                ? selectedClient || "Agency View"
                : "Select Client"
            }
            icon={<SwitchAccountIcon />}
            style={{ color: colors.grey[100] }}
          >
            {/* Add the "Agency View" option */}
            <MenuItem
              onClick={() => {
                setSelectedClient(""); // Clear the selected client
                setView("agency"); // Switch to the "Agency View"
                setSelected("Agency View"); // Update the selected state
              }}
              style={{ color: colors.grey[400] }}
            >
              Agency View
            </MenuItem>
            {clients.map((client) => (
              <MenuItem
                key={client.id}
                onClick={handleClientChange}
                value={client.name}
                style={{ color: colors.grey[400] }}
              >
                {client.name}
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

                        {/* Switch to Dashboard
                        Online Training
                        Settings
                        Event History
                        Personal Stats */}
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

