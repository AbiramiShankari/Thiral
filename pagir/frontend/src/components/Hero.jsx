import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Zap, ShieldCheck } from 'lucide-react';
import logo from '../assets/pagir-logo.png';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center bg-gray-50 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-100/50 to-transparent z-0"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-48 -left-24 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                        Share Food. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-green-700">
                            Save the Planet.
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                        Pagir connects surplus food donors with households, NGOs, and biogas plants using AI-powered automation to eliminate food waste.
                    </p>

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link to="/donate" className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            Donate Food
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <Link to="/find" className="inline-flex justify-center items-center px-8 py-4 border-2 border-primary-100 text-lg font-medium rounded-xl text-primary-700 bg-white hover:bg-primary-50 shadow-sm transition-all">
                            Find Nearby Food
                        </Link>
                    </div>

                    <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500 font-medium">
                        <a href="https://t.me/pagir_food_bot" target="_blank" rel="noreferrer" className="flex items-center hover:text-primary-600 transition-colors">
                            <span className="bg-blue-50 text-blue-600 p-2 rounded-full mr-2 shadow-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.45 3.96-1.46.09 0 .28.02.39.1.09.07.13.18.15.28 0 .04.01.1 0 .18z" /></svg>
                            </span>
                            Open Telegram Bot
                        </a>
                        <Link to="/impact" className="flex items-center hover:text-primary-600 transition-colors">
                            <span className="bg-primary-50 text-primary-600 p-2 rounded-full mr-2 shadow-sm">
                                <Heart className="w-4 h-4" />
                            </span>
                            View Impact Dashboard
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: [-10, 10, -10] }}
                    transition={{
                        opacity: { duration: 0.8, delay: 0.2 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="relative hidden lg:block"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-200 to-green-100 transform rotate-3 rounded-[3rem] shadow-2xl glass-panel"></div>
                    <div className="relative rounded-[3rem] shadow-xl h-[500px] w-full transform -rotate-3 transition-transform hover:rotate-0 duration-500 bg-white/60 backdrop-blur-xl border border-white/40 flex items-center justify-center p-10">
                        <img src={logo} alt="PAGIR Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                    </div>

                    {/* Floating Badges */}
                    <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-3 shadow-green-900/10">
                        <div className="bg-green-100 p-2 rounded-full">
                            <ShieldCheck className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Meals Rescued</p>
                            <p className="text-lg font-extrabold text-gray-900">4,520+</p>
                        </div>
                    </div>

                    <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-3 shadow-orange-900/10">
                        <div className="bg-orange-100 p-2 rounded-full">
                            <Zap className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Energy Generated</p>
                            <p className="text-lg font-extrabold text-gray-900">850 kWh</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
