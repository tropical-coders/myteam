import { HomeIcon, FolderKanbanIcon, CheckSquare2Icon, UsersIcon, SettingsIcon, CalendarIcon } from "lucide-react";

const Navbar = () => {
    return (
        <div className="w-50 h-screen bg-gray-800 fixed left-0 top-0 text-white">
            <div className="flex items-center justify-evenly p-4 border-b border-gray-700">
            <img 
            src="/logo.png"
            alt="Tool Logo" 
            className="h-8 w-8 mb-2"
            />
            <h2 className="text-xl font-semibold">MyTeam</h2>
            </div>
            
            <nav className="mt-4">
            <ul className="space-y-2">
            <li>
            <a href="/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <HomeIcon className="w-6 h-6" />
                <span className="ml-2">Dashboard</span>
            </a>
            </li>
            <li>
            <a href="/projects" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <FolderKanbanIcon className="w-6 h-6" />
                <span className="ml-2">Projects</span>
            </a>
            </li>
            <li>
            <a href="/tasks" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <CheckSquare2Icon className="w-6 h-6" />
                <span className="ml-2">Tasks</span>
            </a>
            </li>
            <li>
            <a href="/team" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <UsersIcon className="w-6 h-6" />
                <span className="ml-2">Team</span>
            </a>
            </li>
            <li>
            <a href="/calendar" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <CalendarIcon className="w-6 h-6" />
                <span className="ml-2">Calendar</span>
            </a>
            </li>
            <li>
            <a href="/settings" className="flex items-center px-4 py-2 hover:bg-gray-700 transition-colors">
                <SettingsIcon className="w-6 h-6" />
                <span className="ml-2">Settings</span>
            </a>
            </li>
            </ul>
            </nav>
        </div>
        );
};

export default Navbar;
