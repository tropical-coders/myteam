import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            const { data } = await axios.put(
                `${API_URL}/api/v1/change-email`,
                { new_email: newEmail, password },
                { withCredentials: true }
            );

            if (data.success) {
                setSuccess(true);
                setNewEmail('');
                setPassword('');
            } else {
                setError(data.message || 'Failed to update email');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Change Email
            </Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}

            {success && (
                <Typography sx={{ mb: 2 }} color="green">
                    Email successfully updated!
                </Typography>
            )}

            <TextField
                fullWidth
                label="New Email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Current Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
            >
                Update Email
            </Button>
        </Box>
    );
};

export default ChangeEmail;
