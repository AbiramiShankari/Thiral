import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { UserCircle, ArrowRight } from 'lucide-react';
import logo from '../assets/pagir-logo.png';

const Login = () => {
    const navigate = useNavigate();
    const { loginUser } = useAppContext();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = (e) => {
        e.preventDefault();
        // Setup global context for the user when they successfully login
        loginUser({
            name: isLogin ? 'Demo User' : name || 'New Donor',
            email: email,
            joinDate: 'Oct 2025',
            mealsDonated: 125,
            level: 'Silver Donor',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        });
        navigate('/home');
    };

    const handleGuest = () => {
        navigate('/home');
    };

    const fillMockData = () => {
        if (!isLogin) setName('Sarah Connor');
        setEmail('demo@pagir.com');
        setPassword('hackathon2026');
    };

    return (
        <section className="min-h-screen flex items-center justify-center text-gray-900 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 py-16">

                {/* Left Side: Branding and Mission */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center h-full pr-0 lg:pr-10"
                >
                    <div className="flex items-center space-x-3 mb-10">
                        <img src={logo} alt="PAGIR Logo" className="w-14 h-14 object-contain drop-shadow-md" />
                        <h1 className="text-4xl font-extrabold tracking-tight">PAGIR</h1>
                    </div>

                    <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-3">Welcome to Pagir</h2>
                    <h3 className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-green-800 leading-tight mb-6">
                        Share Food.<br />Save the Planet.
                    </h3>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg">
                        Join our mission to eliminate food waste. Log in to track your live donations, coordinate community pickups, and watch your personal environmental impact grow.
                    </p>

                    <ul className="space-y-5 max-w-md">
                        {[
                            "Track real-time meals donated across your active locations.",
                            "Auto-fill addresses for instant tracking and delivery.",
                            "Earn top-tier Donor Badges to showcase your community impact."
                        ].map((feature, idx) => (
                            <li key={idx} className="flex items-start text-gray-700 font-medium">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4 shrink-0 mt-0.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <span className="leading-snug">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Right Side: The Form Portal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100/50 w-full max-w-lg mx-auto relative lg:mr-0 z-20"
                >
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary-400 to-green-500 rounded-full blur-2xl opacity-30 z-0"></div>

                    <div className="relative z-10 mb-8 flex items-center justify-between">
                        <div>
                            <h4 className="text-2xl font-bold text-gray-900">
                                {isLogin ? 'Log into Dashboard' : 'Create an Account'}
                            </h4>
                            <p className="text-sm text-gray-500 font-medium mt-1">
                                {isLogin ? 'Enter your details below to continue.' : 'Join the climate movement.'}
                            </p>
                        </div>
                        <UserCircle className="w-10 h-10 text-primary-200 hidden sm:block" />
                    </div>

                    <form onSubmit={handleAuth} className="space-y-5 relative z-10">
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <label className="block text-sm font-semibold text-gray-700 mb-1 mt-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none bg-gray-50 text-gray-900"
                                        placeholder="Jane Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none bg-gray-50 text-gray-900"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 transition-all outline-none bg-gray-50 text-gray-900"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-4 flex flex-col space-y-3">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center py-4 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
                            >
                                {isLogin ? 'Login to Dashboard' : 'Sign Up & Continue'}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </button>

                            <button
                                type="button"
                                onClick={fillMockData}
                                className="w-full py-2 text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors"
                            >
                                Use Hackathon Test Credentials
                            </button>
                        </div>
                    </form>

                    <div className="relative flex items-center py-6 z-10">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-semibold uppercase">Or skip for now</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <div className="flex flex-col space-y-4 relative z-10">
                        <button
                            type="button"
                            onClick={handleGuest}
                            className="w-full py-3.5 px-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border-2 border-gray-200 shadow-sm transition-all"
                        >
                            Continue as Guest
                        </button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors"
                            >
                                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Login;
