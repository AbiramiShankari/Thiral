import { useState } from 'react';
import { Leaf, MapPin, Zap, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const BiogasForm = () => {
    const { addBiogasPlant } = useAppContext();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        capacity: '',
        contact: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate firebase saving + update global context
        setTimeout(() => {
            addBiogasPlant({
                name: formData.name,
                capacity: formData.capacity,
                location: formData.location
            });
            setLoading(false);
            setSuccess(true);
        }, 1200);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden"
            >
                <div className="p-8">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                <Leaf className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Plant Registered!</h3>
                            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
                                Thank you for joining the circular economy. We will direct expired food to your plant safely.
                            </p>
                            <button
                                onClick={() => setSuccess(false)}
                                className="text-orange-600 font-medium hover:text-orange-700"
                            >
                                Register another plant
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Leaf size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="e.g. GreenEnergy BioGas"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <MapPin size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="location"
                                            required
                                            placeholder="e.g. North Industrial Park, Chennai"
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Daily Capacity (kg)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                <Zap size={18} />
                                            </div>
                                            <input
                                                type="number"
                                                name="capacity"
                                                required
                                                min="1"
                                                placeholder="e.g. 500"
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

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
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                onChange={(e) => {
                                                    // only allow numbers
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    e.target.value = val;
                                                    handleChange(e);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Registering...' : 'Register Plant'}
                            </button>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default BiogasForm;
