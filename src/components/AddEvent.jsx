import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';

const AddEventForm = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        client: '',
        name: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${SERVER_URL}/event/new-event`, formData);
            closeModal();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input fields for each formData property */}
                <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="Client"
                />
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    placeholder="End Date"
                />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                
                <button type="submit">Add Event</button>
            </form>
            <button onClick={closeModal}>Close</button>
        </div>
    );
};

export default AddEventForm;
``
