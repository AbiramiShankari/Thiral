import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Map, Activity, PlusCircle, Search, Recycle, HeartHandshake, ShieldCheck } from 'lucide-react';
import logo from '../assets/pagir-logo.png';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/home', icon: <Leaf size={20} /> },
        { name: 'Donate', path: '/donate', icon: <PlusCircle size={20} /> },
        { name: 'Find Food', path: '/find', icon: <Search size={20} /> },
        { name: 'Map', path: '/map', icon: <Map size={20} /> },
        { name: 'Biogas', path: '/biogas', icon: <Recycle size={20} /> },
        { name: 'Volunteer', path: '/volunteer', icon: <HeartHandshake size={20} /> },
        { name: 'Impact', path: '/impact', icon: <Activity size={20} /> },
        { name: 'Admin', path: '/admin', icon: <ShieldCheck size={20} /> },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-[999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/home" className="flex items-center space-x-2">
                        <img src={logo} alt="PAGIR Logo" className="h-10 object-contain" />
                        <span className="text-xl font-bold text-gray-900 tracking-tight">PAGIR</span>
                    </Link>

                    <div className="hidden md:flex space-x-1">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                                            initial={false}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
