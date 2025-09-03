import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Container, Paper } from '@mui/material';
import Profile from './settings/Profile';
import ChangePassword from './settings/ChangePassword';
import ChangeEmail from './settings/ChangeEmail';
import Logout from './settings/Logout';
import Navbar from '../components/Navbar';
const Settings = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const TabPanel = ({ children, value, index }) => {
        return (
            <div role="tabpanel" hidden={value !== index}>
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    };

    return (
        <div className="flex h-screen bg-gray-100">
             <div className= "w-64">
                <Navbar />
            </div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Settings
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Profile" />
                        <Tab label="Change Password" />
                        <Tab label="Change Email" />
                        <Tab label="Logout" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Profile />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ChangePassword />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <ChangeEmail />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Logout />
                </TabPanel>
            </Paper>
        </Container>
        </div>
    );
};

export default Settings;