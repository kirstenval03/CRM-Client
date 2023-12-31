import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { teamData } from "../../data/teamData";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";

import Header from "../../components/Header";

const TeamMembers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
      { field: "id", headerName: "ID" },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
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
        headerName: "Phone Number",
        flex: 1,
      },
      
      {
        field: "accessLevel",
        headerName: "Access Level",
        flex: 1,
        renderCell: ({ row: { access } }) => {
          return (
            <Box
              width="100%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="left"
              backgroundColor={
                access === "admin"
                  ? colors.greenAccent[600]
                  : access === "manager"
                  ? colors.greenAccent[700]
                  : colors.greenAccent[700]
              }
              borderRadius="4px"
            >
              
              {access === "Admin" && <SecurityOutlinedIcon />}
              {access === "Restricted" && <LockOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "3px" }}>
                {access}
              </Typography>
            </Box>
          );
        },
      },
    ];
  
    return (
      <Box m="20px">
        <Header title="E3 - TEAM"/>
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
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={teamData} columns={columns} />
        </Box>
      </Box>
    );
  };

export default TeamMembers;