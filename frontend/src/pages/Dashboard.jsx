import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Toggle Button */}
                <button
                    onClick={toggleSidebar}
                    className="m-4 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    <FaBars />
                </button>

                {/* Dashboard Content */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Project Dashboard</h1>
                    
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Project Stats Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Project Stats</h2>
                            <p>Total Projects: 12</p>
                            <p>In Progress: 5</p>
                            <p>Completed: 7</p>
                        </div>

                        {/* Recent Activities Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
                            <ul className="space-y-2">
                                <li>Project A updated</li>
                                <li>New task added</li>
                                <li>Meeting scheduled</li>
                            </ul>
                        </div>

                        {/* Team Members Card */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
                            <ul className="space-y-2">
                                <li>John Doe</li>
                                <li>Jane Smith</li>
                                <li>Mike Johnson</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;