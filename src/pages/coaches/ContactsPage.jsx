import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Button, TableSortLabel, TextField, MenuItem, Select,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { useContacts } from "../../context/contact.context";
import ContactDetails from "../../components/ContactDetails";
import KanbanBoardPage from "./KanbanBoard";


const ContactsPage = ({ contacts }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const {
    eventContacts,
    fetchContacts,
    importContacts,
    handleColorChange,
  } = useContacts();
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColor, setFilterColor] = useState(""); // State for filter color
  const [selectedContact, setSelectedContact] = useState(null);
  
  


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchContacts(eventId);
  }, [eventId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSwitchToBoardView = () => {
    navigate(`/contact/board/${eventId}`);
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleImportContacts = () => {
    importContacts(eventId);
  };

  const handleColorFilterChange = (event) => {
    setFilterColor(event.target.value); // Update filter color state
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
      (contact.name?.toLowerCase() || "").includes(searchQuery) ||
      (contact.email?.toLowerCase() || "").includes(searchQuery)
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
    // Convert coachName values to lowercase for consistent sorting
    const lowerCaseA = typeof a === 'string' ? a.toLowerCase() : a;
    const lowerCaseB = typeof b === 'string' ? b.toLowerCase() : b;
  
    if (lowerCaseB < lowerCaseA) {
      return -1;
    }
    if (lowerCaseB > lowerCaseA) {
      return 1;
    }
    return 0;
  };
  const filterContactsByColor = (contacts, color) => {
    if (!color) return contacts; // If no color is selected, return all contacts
    return contacts.filter(contact => 
      color === '' || // If no color filter is selected, return all contacts
      contact.statusColor.includes(color) // Check if the contact's statusColor array includes the selected color
    );
  };
  
  
  const mapColorToPastel = (color) => {
    const pastelColors = {
      green: "#D9EAD3",
      yellow: "#FFFDCC",
      red: "#F4CCCC",
    };
    return pastelColors[color] || "";
  };
  
  const sortedAndFilteredContacts = filterContactsByColor(
    sortArray(filteredContacts, getComparator(order, orderBy)),
    filterColor // Apply color filter
  );
  
  const totalPage = Math.ceil(sortedAndFilteredContacts.length / rowsPerPage);
  const displayContacts = sortedAndFilteredContacts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleContactClick = (contact) => {
    setSelectedContact(contact); // Set selected contact when clicked
  };

  const handleCloseContactDetails = () => {
    setSelectedContact(null); // Close contact details when closed
  };


  return (
    <div style={{ margin: "10px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleSwitchToBoardView(eventId)} // Pass the eventId to the handler
      >
        Switch to Board View
      </Button>
      
      <KanbanBoardPage eventId={eventId} />

      <Button variant="contained" color="primary">
        Add Contact
      </Button>

      <TextField
        label="Search Contacts"
        variant="outlined"
        style={{ marginLeft: "10px" }}
        onChange={handleSearchChange}
      />
      {/* Dropdown for filtering by color */}
      <Select
        value={filterColor}
        onChange={handleColorFilterChange}
        variant="outlined"
        style={{ marginLeft: "10px" }}
      >
        <MenuItem value="">All Colors</MenuItem>
        <MenuItem value="green">Green</MenuItem>
        <MenuItem value="yellow">Yellow</MenuItem>
        <MenuItem value="red">Red</MenuItem>
      </Select>
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
                  active={orderBy === "firstName"}
                  direction={orderBy === "firstName" ? order : "asc"}
                  onClick={() => handleSort("firstName")}
                >
                  First Name
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
                  active={orderBy === "lastName"}
                  direction={orderBy === "lastName" ? order : "asc"}
                  onClick={() => handleSort("lastName")}
                >
                  Last Name
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
                  active={orderBy === "ticketRevenue"}
                  direction={orderBy === "ticketRevenue" ? order : "asc"}
                  onClick={() => handleSort("ticketRevenue")}
                >
                  Ticket Revenue
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
                  active={orderBy === "vip"}
                  direction={orderBy === "vip" ? order : "asc"}
                  onClick={() => handleSort("vip")}
                >
                  VIP
                </TableSortLabel>
              </TableCell>
              <TableCell>Coach</TableCell>
              <TableCell>Status</TableCell>{" "}
              {/* Add column for color selection */}
              <TableCell>Actions</TableCell> {/* Add column for actions */}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayContacts.map((contact) => (
              <TableRow
                key={contact._id}
                style={{
                  backgroundColor: mapColorToPastel(contact.statusColor) || "",
                }}
              >
                <TableCell>{contact.firstName}</TableCell>
                <TableCell>{contact.lastName}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>{contact.ticketRevenue}</TableCell>
                <TableCell>{contact.vip}</TableCell>
                <TableCell>{contact.coachName}</TableCell>
                <TableCell>
                  <Select
                    value={contact.statusColor || ""}
                    onChange={(event) =>
                      handleColorChange(
                        eventId,
                        contact._id,
                        event.target.value
                      )
                    }
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="yellow">Yellow</MenuItem>
                    <MenuItem value="red">Red</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleContactClick(contact)}
                  >
                    See Contact Details
                  </Button>
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
      {/* Render ContactDetails component when a contact is selected */}
      {selectedContact && (
        <div className="overlay" onClick={handleCloseContactDetails}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            {" "}
            {/* Prevent click from closing the modal */}
            <ContactDetails
              contact={selectedContact}
              eventId={eventId}
              onClose={handleCloseContactDetails}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseContactDetails}
              style={{ position: "absolute", top: "10px", right: "10px" }} // Close button style
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;



