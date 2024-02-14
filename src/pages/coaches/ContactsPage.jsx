import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  TableSortLabel,
  TextField,
  MenuItem, // Import MenuItem component for dropdown menu
  Select, // Import Select component for dropdown menu
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { useContacts } from "../../context/contact.context";

const ContactsPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { eventContacts, fetchContacts, importContacts, handleColorChange } = useContacts();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const rowsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchContacts(eventId);
  }, [eventId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleImportContacts = () => {
    importContacts(eventId);
  };

  if (!eventContacts || eventContacts.length === 0) {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={handleImportContacts}>
          Import Event Contacts
        </Button>
      </div>
    );
  }

  const filteredContacts = eventContacts.filter(
    (contact) =>
      (contact.name?.toLowerCase() || '').includes(searchQuery) ||
      (contact.email?.toLowerCase() || '').includes(searchQuery)
  );
  

  const sortArray = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
      : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  };

  const sortedAndFilteredContacts = sortArray(
    filteredContacts,
    getComparator(order, orderBy)
  );
  const totalPage = Math.ceil(sortedAndFilteredContacts.length / rowsPerPage);
  const displayContacts = sortedAndFilteredContacts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div style={{ margin: "10px" }}>
      <Button variant="contained" color="primary">
        Add Contact
      </Button>

      <TextField
        label="Search Contacts"
        variant="outlined"
        style={{ marginLeft: "10px" }}
        onChange={handleSearchChange}
      />

      <Paper style={{ marginTop: "10px", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "email"}
                  direction={orderBy === "email" ? order : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "phone"}
                  direction={orderBy === "phone" ? order : "asc"}
                  onClick={() => handleSort("phone")}
                >
                  Phone
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "source"}
                  direction={orderBy === "source" ? order : "asc"}
                  onClick={() => handleSort("source")}
                >
                  Source
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "coachName"}
                  direction={orderBy === "coachName" ? order : "asc"}
                  onClick={() => handleSort("coachName")}
                >
                  Coach
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      opacity: 1,
                      visibility: "visible",
                    },
                  }}
                  active={orderBy === "coachEmail"}
                  direction={orderBy === "coachEmail" ? order : "asc"}
                  onClick={() => handleSort("coachEmail")}
                >
                  Coach Email
                </TableSortLabel>
              </TableCell>

              <TableCell>Status</TableCell> {/* Add column for color selection */}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayContacts.map((contact) => (
              <TableRow key={contact._id}>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.source}</TableCell>
                <TableCell>{contact.coachName}</TableCell>
                <TableCell>{contact.coachEmail}</TableCell>
                <TableCell>
                  {/* Dropdown menu for selecting color */}
                  <Select
  value={contact.statusColor || ''}
  onChange={(event) =>
    handleColorChange(eventId, contact._id, event.target.value)
  }
>
                    <MenuItem value="">None</MenuItem> 
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ padding: "20px" }}
        />
      </Paper>
    </div>
  );
};

export default ContactsPage;