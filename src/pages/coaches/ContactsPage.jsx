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
  MenuItem,
  Select,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import { useContacts } from "../../context/contact.context";
import ContactDetails from "../../components/ContactDetails";
import AddContactForm from "../../components/AddContact";

const ContactsPage = ({ contacts }) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { coaches, fetchEventCoaches } = useContacts(); 

  // Add state to manage the visibility of the AddContactForm
  const [showAddContactForm, setShowAddContactForm] = useState(false);

  // Toggle the visibility of the AddContactForm
  const toggleAddContactForm = () => {
    setShowAddContactForm(!showAddContactForm);
  };

  const {
    eventContacts,
    fetchContacts,
    importContacts,
    handleColorChange,
  } = useContacts();

  
    // STATE VARIABLES------------------------------
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColor, setFilterColor] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterCoachName, setFilterCoachName] = useState("");


  //  CHANGE HANDLERS------------------------------
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchContacts(eventId);
    fetchEventCoaches(eventId);
  }, []);

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
    setFilterColor(event.target.value);
  };

  const handleCoachNameFilterChange = (event) => {
    setFilterCoachName(event.target.value);
  }; // Handler for coach name filter


  if (!eventContacts || eventContacts.length === 0) {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleImportContacts}
        >
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
    const lowerCaseA = typeof a === "string" ? a.toLowerCase() : a;
    const lowerCaseB = typeof b === "string" ? b.toLowerCase() : b;

    if (lowerCaseB < lowerCaseA) {
      return -1;
    }
    if (lowerCaseB > lowerCaseA) {
      return 1;
    }
    return 0;
  };

  const filterContactsByColor = (contacts, color) => {
    if (!color) return contacts;
    return contacts.filter(
      (contact) =>
        color === "" || contact.statusColor.includes(color)
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
    sortArray(
      filteredContacts.filter(
        (contact) =>
          contact.coachName.toLowerCase().includes(filterCoachName.toLowerCase())
      ),
      getComparator(order, orderBy)
    ),
    filterColor
  );

  const totalPage = Math.ceil(sortedAndFilteredContacts.length / rowsPerPage);
  const displayContacts = sortedAndFilteredContacts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleCloseContactDetails = () => {
    setSelectedContact(null);
  };


  
//  RETURN--------------------------------------------------
  return (
    <div style={{ margin: "10px" }}>
      <div className="contacts-topbar">
        <div className="buttons-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSwitchToBoardView(eventId)}
          >
            Switch to Board View
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={toggleAddContactForm}
          >
            Add Contact
          </Button>
        </div>

        <div className="filters-container">
          
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
          
          <Select
            value={filterCoachName} // Set value to an empty string since you want to show all coaches by default
            onChange={handleCoachNameFilterChange}
            variant="outlined"
            style={{ marginLeft: "10px" }}
          >
            <MenuItem value=" ">All Coaches</MenuItem>
            {coaches.map((coach, index) => (
              <MenuItem key={index} value={coach}>
                {coach}
              </MenuItem>
            ))}
          </Select>

          <TextField
            label="Search Contacts"
            variant="outlined"
            style={{ marginLeft: "10px" }}
            onChange={handleSearchChange}
          />
        </div>
        
      </div>

      {/* Render AddContactForm component conditionally */}
      {showAddContactForm && <AddContactForm onClose={toggleAddContactForm} />}

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

              <TableCell>Stage</TableCell>
              <TableCell>Color</TableCell>{" "}
              {/* Add column for color selection */}
             
            </TableRow>
          </TableHead>
          <TableBody>
            {displayContacts.map((contact) => (
              <TableRow
              key={contact._id}
              style={{
                backgroundColor: mapColorToPastel(contact.statusColor) || "",
              }}
              onDoubleClick={() => handleContactClick(contact)} // Add double click event handler here
            >
                <TableCell className="clickable">{contact.firstName} </TableCell>
                <TableCell className="clickable">{contact.lastName}</TableCell>
                <TableCell className="clickable">{contact.email}</TableCell>
                <TableCell className="clickable">{contact.phone}</TableCell>
                <TableCell className="clickable">{contact.ticketRevenue}</TableCell>
                <TableCell className="clickable">{contact.vip}</TableCell>
                <TableCell className="clickable">{contact.coachName}</TableCell>
                <TableCell className="clickable">{contact.pipelineStatus}</TableCell>
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
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <div
        style={{
          marginTop: "10px",
          overflowX: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          color="primary"
          style={{ padding: "20px" }}
        />

        <div>
          <div style={{ textAlign: "center" }}>
            Total {eventContacts.length} records
          </div>
          <div style={{ textAlign: "center" }}>
            {page} of {totalPage} Pages
          </div>
        </div>
      </div>

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



