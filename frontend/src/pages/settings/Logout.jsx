import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Manually remove cookie
            document.cookie = "access_token_cookie=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=None; Secure";

            // Refresh page (backend will see no cookie)
            window.location.reload();
            navigate('/');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <div className="logout-container">
            <h2>Logout</h2>
            <p>Are you sure you want to logout?</p>
            <div className="logout-buttons">
                <button onClick={handleLogout} className="logout-btn">
                    Yes, Logout
                </button>
                <button onClick={() => navigate('/settings')} className="cancel-btn">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;
