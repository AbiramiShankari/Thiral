import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Calendar, Truck, HeartHandshake, CheckCircle } from 'lucide-react';

const VolunteerRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        location: '',
        availability: 'weekends',
        vehicle: 'none'
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate registration
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Join the Rescue Team
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Volunteer to transport surplus food from donors to those in need, or to biogas plants when necessary. Sign up and make a real difference!
                    </motion.p>
                </div>

                <div className="max-w-xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-xl border border-primary-100 overflow-hidden"
                    >
                        <div className="p-8">
                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center py-12"
                                >
                                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                        <CheckCircle className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to the Team!</h3>
                                    <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                        Thank you for signing up to volunteer! We will reach out to you when a delivery matches your availability and location.
                                    </p>
                                    <button
                                        onClick={() => setSuccess(false)}
                                        className="text-primary-600 font-medium md:hover:text-primary-700"
                                    >
                                        Register another volunteer
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    placeholder="John Doe"
                                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                    onChange={handleChange}
                                                    value={formData.name}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact No</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <Phone size={18} />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="contact"
                                                        required
                                                        maxLength="10"
                                                        pattern="[0-9]{10}"
                                                        title="Please enter a valid 10-digit mobile number"
                                                        placeholder="9876543210"
                                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        value={formData.contact}
                                                        onChange={(e) => {
                                                            const val = e.target.value.replace(/\D/g, '');
                                                            e.target.value = val;
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <MapPin size={18} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="location"
                                                        required
                                                        placeholder="e.g. Adyar"
                                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        onChange={handleChange}
                                                        value={formData.location}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <Calendar size={18} />
                                                    </div>
                                                    <select
                                                        name="availability"
                                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        onChange={handleChange}
                                                        value={formData.availability}
                                                    >
                                                        <option value="weekends">Weekends Only</option>
                                                        <option value="weekdays">Weekdays</option>
                                                        <option value="anytime">Anytime</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Match</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <Truck size={18} />
                                                    </div>
                                                    <select
                                                        name="vehicle"
                                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        onChange={handleChange}
                                                        value={formData.vehicle}
                                                    >
                                                        <option value="none">No Vehicle</option>
                                                        <option value="bike">2-Wheeler (Bike)</option>
                                                        <option value="car">4-Wheeler (Car/Van)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Registering...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <HeartHandshake size={20} />
                                                <span>Register as Volunteer</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegister;
