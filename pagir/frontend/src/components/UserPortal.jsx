import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { UserCircle, LogOut, Package, Star, Calendar, Mail } from 'lucide-react';

const UserPortal = () => {
    const { user, logoutUser } = useAppContext();

    if (user) {
        return (
            <section className="py-16 bg-gray-50 border-t border-gray-200" id="portal">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden"
                    >
                        {/* Cover Image */}
                        <div className="h-48 bg-gradient-to-r from-primary-600 to-green-700 relative">
                            <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-24"></div>
                            <button
                                onClick={logoutUser}
                                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center transition-colors"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        </div>

                        {/* Profile Info */}
                        <div className="px-8 pb-8 relative">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 mb-8 gap-4">
                                <div className="flex items-end space-x-5">
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden relative z-10 bg-white">
                                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="mb-2 relative z-10">
                                        <h2 className="text-3xl font-extrabold text-gray-900">{user.name}</h2>
                                        <div className="flex items-center space-x-3 mt-1">
                                            <span className="flex items-center text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                                                <Star size={14} className="mr-1 fill-amber-500" />
                                                {user.level}
                                            </span>
                                            <span className="flex items-center text-sm text-gray-500">
                                                <Mail size={14} className="mr-1" />
                                                {user.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100 flex flex-col justify-center items-center text-center">
                                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                                        <Package size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">{user.mealsDonated}</h3>
                                    <p className="text-sm font-medium text-primary-700 mt-1">Total Meals Donated</p>
                                </div>
                                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 flex flex-col justify-center items-center text-center">
                                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <Star size={24} />
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900">4</h3>
                                    <p className="text-sm font-medium text-green-700 mt-1">Active Deliveries</p>
                                </div>
                                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 flex flex-col justify-center items-center text-center">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                        <Calendar size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mt-2">{user.joinDate}</h3>
                                    <p className="text-sm font-medium text-blue-700 mt-1">Member Since</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    // Guest View
    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-primary-50 border-t border-gray-200" id="portal">
            <div className="max-w-3xl mx-auto px-4 text-center">
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCircle size={32} />
                </div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">You are browsing as a Guest</h3>
                <p className="text-lg text-gray-600 mb-8">
                    To track your live donations, coordinate food pickups, and watch your personal environmental impact grow over time, please log in.
                </p>
                <button
                    onClick={() => window.location.href = '/login'}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-primary-600 hover:bg-primary-700"
                >
                    Return to Login
                </button>
            </div>
        </section>
    );
};

export default UserPortal;
