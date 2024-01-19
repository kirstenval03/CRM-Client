import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context";
import { useNavigate } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";

// Import necessary icons for Academy members
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const AcademySidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Academy Dashboard");
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const academyMenuItems = [
    {
      title: "Academy Dashboard",
      to: "/academy-dashboard",
      icon: <DashboardIcon />,
    },
    {
      title: "Curriculum",
      to: "/curriculum",
      icon: <BookIcon />,
    },
    {
      title: "LogOut",
      icon: <ExitToAppIcon />,
    },
  ];

  const handleMenuItemClick = (menuItem) => {
    setSelected(menuItem.title);
    if (menuItem.title === "LogOut") {
      logOutUser(); // Handle logout
    } else {
      navigate(menuItem.to);
    }
  };

  const logOutUser = () => {
    // Implement your logout logic here
    // For example, clear authentication token or user data from local storage
    // You may need to create a logOutUser function in your context
    localStorage.removeItem("authToken"); // Clear the authentication token
    // Additional logout logic can be added here, such as clearing user data
    navigate("/login"); // Redirect to the login page or any desired route
  };

  useEffect(() => {
    // Fetch user data or update user info if needed
    // You can use the currentUser object to display user information
  }, [currentUser]);

  return (
    <Box>
      <ProSidebar className="sidebar" collapsed={isCollapsed}>
        <Box
          sx={{
            borderBottom: `1px solid ${colors.grey[700]}`,
            padding: "10px 20px",
            textAlign: "center",
          }}
        >
          
          {!isCollapsed && (
             <Typography variant="h4" sx={{ mt: 2, color: colors.grey[500] }}>
              Welcome, <br />
              {currentUser && (
                <>
                  {currentUser.firstName} {currentUser.lastName}
                </>
              )}
            </Typography>
          )}
        </Box>
        <IconButton
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              zIndex: 999,
              backgroundColor: colors.primary[400],
              color: colors.grey[100],
              transition: "top 0.3s",
              position: "absolute",
              top: isCollapsed ? "10px" : "45px", // Adjust the top position
              left: isCollapsed ? "60%" : "85%", // Adjust the left position
            }}
          >
            {isCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>

        <Menu iconShape="square">
          {academyMenuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.title}
              active={selected === menuItem.title}
              onMouseUp={() => handleMenuItemClick(menuItem)}
              icon={menuItem.icon}
            >
              <Typography>{menuItem.title}</Typography>
            </MenuItem>
            
          ))}
        </Menu>
        
      </ProSidebar>
    
    </Box>
    
  );
};

export default AcademySidebar;







