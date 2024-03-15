import React, { useState } from "react";
import { useContacts } from "../context/contact.context"; // Import the useContacts hook from the context

const AddContactForm = ({ onClose }) => {
  const { addContact } = useContacts(); // Get the addContact function from the context
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    ticketRevenue: "",
    vip: "",
    source: "",
    country: "",
    state: "",
    coachName: "",
    coachEmail: "",
    pipelineStatus: "",
    notes: "",
    statusColor: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(newContact); // Pass the new contact to the addContact function
      console.log("Contact added successfully");
      onClose(); // Close the form
      // Optionally, clear the form fields after successful submission
      setNewContact({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        ticketRevenue: "",
        vip: "",
        source: "",
        country: "",
        state: "",
        coachName: "",
        coachEmail: "",
        pipelineStatus: "",
        notes: "",
        statusColor: ""
      });
    } catch (error) {
      console.error("Error adding contact:", error);
      // Handle error (display error message, retry, etc.)
    }
  };

  return (
    <div className="add-contact-overlay">
      <div className="add-contact-form-container">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={newContact.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={newContact.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={newContact.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={newContact.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          {/* Add other input fields similarly */}
          <button type="submit">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default AddContactForm;

