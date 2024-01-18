import React, { useContext } from "react";
import { UserContext } from "../../context/user.context";
import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

import Header from "../../components/Header";


const TeamMembers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const yellowColor = "#e0b532";
  const redColor =  "#e06666 ";

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerClassName: "id-column-header",
    },
    {
      field: "role",
      headerName: "Position",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        let backgroundColor = colors.greenAccent[600]; // Default color for admin
    
        if (row.accessLevel === "sales_coach") {
          backgroundColor = yellowColor; // Change to yellow for sales_coach
        } else if (row.accessLevel === "academy_member") {
          backgroundColor = redColor; // Change to red for academy_member
        }
    
        return (
          <Box
            width="100%"
            m="0 auto"
            p="1vh"
            display="flex"
            justifyContent="left"
            backgroundColor={backgroundColor}
            borderRadius="4px"
          >
            {row.accessLevel === "admin" && <SecurityOutlinedIcon />}
            {row.accessLevel === "academy_member" && <LockOutlinedIcon />}
            {row.accessLevel === "sales_coach" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "3px" }}>
              {row.accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const { allUsers } = useContext(UserContext);

  const rows = allUsers.map((user) => ({
    id: user._id,
    name: `${user.firstName} ${user.lastName}`,
    role: user.position,
    email: user.email,
    phone: user.phoneNumber,
    accessLevel: user.role,
  }));

  return (
    <Box m="20px">
      <Header title="E3 - TEAM" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="95%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            display: "none", // Hide the checkbox column
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default TeamMembers;


