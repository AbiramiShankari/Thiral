import { motion } from 'framer-motion';
import { ShieldCheck, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AdminDashboard = () => {
    const { queries, resolveQuery } = useAppContext();

    const pendingQueries = queries.filter(q => q.status === 'pending');
    const resolvedQueries = queries.filter(q => q.status === 'resolved');

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-8 border-b border-gray-200">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center"
                        >
                            <ShieldCheck className="w-8 h-8 text-primary-600 mr-3" />
                            Admin Console
                        </motion.h1>
                        <p className="mt-2 text-gray-500 max-w-xl">
                            Manage user requests and bot queries directly from your connected platforms.
                        </p>
                    </div>

                    <motion.a
                        href="https://t.me/pagir_food_bot"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 md:mt-0 flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl shadow-md transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-semibold tracking-wide">Connect Telegram Bot</span>
                    </motion.a>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Pending Queries Column */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <Clock className="w-6 h-6 text-amber-500" />
                            <h2 className="text-xl font-bold text-gray-900">Pending Telegram Queries <span className="ml-2 bg-amber-100 text-amber-800 text-sm py-1 px-3 rounded-full">{pendingQueries.length}</span></h2>
                        </div>

                        <div className="space-y-4">
                            {pendingQueries.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                    No pending queries. All caught up!
                                </div>
                            ) : (
                                pendingQueries.map((query, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={query.id}
                                        className="bg-white p-5 rounded-2xl border border-amber-100 shadow-md flex flex-col sm:flex-row gap-4"
                                    >
                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-800">{query.user}</span>
                                                <span className="text-xs text-gray-400 font-medium">{query.time}</span>
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">"{query.text}"</p>
                                        </div>
                                        <div className="flex shrink-0 items-end sm:items-center">
                                            <button
                                                onClick={() => resolveQuery(query.id)}
                                                className="w-full sm:w-auto px-4 py-2 bg-amber-50 text-amber-600 hover:bg-amber-100 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center shadow-sm"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-1.5" />
                                                Mark Resolved
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Resolved Queries Column */}
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                            <h2 className="text-xl font-bold text-gray-900">Resolved Queries</h2>
                        </div>

                        <div className="space-y-4">
                            {resolvedQueries.length === 0 ? (
                                <div className="p-8 text-center text-gray-500 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                    No resolved queries yet.
                                </div>
                            ) : (
                                resolvedQueries.map((query, idx) => (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={query.id}
                                        className="bg-gray-50 p-5 rounded-2xl border border-gray-200 opacity-60 flex flex-col"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-medium text-gray-600">{query.user}</span>
                                            <span className="text-xs text-gray-400 font-medium">{query.time}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm leading-relaxed truncate">"{query.text}"</p>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
