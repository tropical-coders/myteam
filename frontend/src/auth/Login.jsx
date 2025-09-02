import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });
        if (!formData.email || !formData.password) {
         setMessage({ type: false, text: "Please fill in all fields." });
         setLoading(false);
         return;
     }

        try {
            const response = await axios.post(`${API_URL}/api/v1/login`, formData, { withCredentials: true });
            const data = response.data;
            console.log('Login response:', data);
            setMessage({ 
                type: data.success,
                text: data.message || 'No message provided'
            });
            if (data.success === true) {
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 300); 
            }
        } catch (error) {
            setMessage({
                type: false,
                text: error.response?.data?.message || 'An error occurred during login'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-8 backdrop-blur-lg bg-white/30 rounded-2xl shadow-xl">
                <div className="flex flex-col items-center">
                    {/* Circular Brand Logo */}
                    <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center shadow-lg">
                        <img 
                    src="/logo.png"
                    alt="Tool Logo" 
                    className="h-20 w-20 mb-2"
                />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Sign in
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-white/70 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="appearance-none relative block w-full px-4 py-3 border border-white/30 placeholder-white/70 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent backdrop-blur-sm"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {message.text && (
                        <div 
                            className={`rounded-lg p-4 backdrop-blur-sm ${
                                message.type 
                                    ? 'bg-green-400/20 text-green-50' 
                                    : 'bg-red-400/20 text-red-50'
                            }`}
                            role="alert"
                        >
                            <p>{message.text}</p>
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600/80 hover:bg-indigo-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02]"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between mt-4">
                    <Link to="/register" className="text-sm text-white hover:text-indigo-200 transition-colors">
                          Don't have an account? Sign up
                    </Link>
                    <Link to="/forgot-password" className="text-sm text-white hover:text-indigo-200 transition-colors">
                          Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;