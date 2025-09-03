import React from 'react';
import { Box, Typography, Paper, Avatar, TextField, Button } from '@mui/material';

const Profile = () => {
    return (
        
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Profile Settings
            </Typography>
            <Paper sx={{ p: 3, mt: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        sx={{ width: 100, height: 100 }}
                        alt="Profile Picture"
                        src="/path-to-profile-picture.jpg"
                    />
                    <Button variant="outlined">Change Picture</Button>
                    
                    <Box sx={{ width: '90%', mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            variant="outlined"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            type="email"
                        />
                        <TextField
                            fullWidth
                            label="Phone"
                            variant="outlined"
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3 }}
                            fullWidth
                        >
                            Save Changes
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default Profile;