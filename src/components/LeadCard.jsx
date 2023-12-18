import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const LeadCard = ({ lead }) => {
    const pastelColors = {
        red: '#ff6961',
        green: '#77dd77',
        yellow: '#fdfd96',
    };

    return (
        <Card style={{ backgroundColor: pastelColors[lead.statusColor] || 'transparent', margin: '10px' }}>
            <CardContent>
                <Typography variant="h5">{lead.name}</Typography>
                <Typography variant="body1">Email: {lead.email}</Typography>
                <Typography variant="body2">Coach: {lead.coachName}</Typography>
                {/* Add more lead details here */}
            </CardContent>
        </Card>
    );
};

export default LeadCard;
