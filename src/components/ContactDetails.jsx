import React, { useState } from "react";
import { useContacts } from "../context/contact.context"; // Import the useContacts hook from the context

const ContactDetails = ({ contact, eventId, onClose }) => {
  const { updateContact } = useContacts(); // Get the updateContact function from the context
  const [updatedContact, setUpdatedContact] = useState({ ...contact });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pass eventId as the first parameter
      await updateContact(eventId, updatedContact._id, updatedContact);
      console.log("Contact updated successfully");
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating contact:", error);
      // Handle error (display error message, retry, etc.)
    }
  };

  return (
    <div className="contactDetailsModal">
      <div className="contactDetailsModalContent">
        <h2 className="contactDetailsHeading">Contact Details</h2>
        <form className="contactDetailsForm" onSubmit={handleSubmit}>
          <label className="contactDetailsLabel">
            First Name:
            <input
              className="contactDetailsInput"
              type="text"
              name="firstName"
              value={updatedContact.firstName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Last Name:
            <input
              className="contactDetailsInput"
              type="text"
              name="lastName"
              value={updatedContact.lastName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Email:
            <input
              className="contactDetailsInput"
              type="text"
              name="email"
              value={updatedContact.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Phone:
            <input
              className="contactDetailsInput"
              type="text"
              name="phone"
              value={updatedContact.phone}
              onChange={handleChange}
            />
          </label>
          
          <br />
          <label className="contactDetailsLabel">
            Ticket Revenue:
            <input
              className="contactDetailsInput"
              type="text"
              name="ticketRevenue"
              value={updatedContact.ticketRevenue}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            VIP:
            <input
              className="contactDetailsInput"
              type="text"
              name="vip"
              value={updatedContact.vip}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Source:
            <input
              className="contactDetailsInput"
              type="text"
              name="source"
              value={updatedContact.source}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Country:
            <input
              className="contactDetailsInput"
              type="text"
              name="country"
              value={updatedContact.country}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            State:
            <input
              className="contactDetailsInput"
              type="text"
              name="state"
              value={updatedContact.state}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Coach:
            <input
              className="contactDetailsInput"
              type="text"
              name="coachName"
              value={updatedContact.coachName}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Coach Email:
            <input
              className="contactDetailsInput"
              type="text"
              name="coachEmail"
              value={updatedContact.coachEmail}
              onChange={handleChange}
            />
          </label>
          <br />
          <label className="contactDetailsLabel">
            Notes:
            <textarea
              className="contactDetailsTextarea"
              name="notes"
              value={updatedContact.notes}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* Other input fields */}
          <button className="contactDetailsButton" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default ContactDetails;
