import { useState } from 'react';
import { motion } from 'framer-motion';
import { submitFoodReport } from '../services/n8nApi';
import { Clock, MapPin, Package, Tag, Utensils, Info } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FoodForm = () => {
    const { addDonation } = useAppContext();
    const [formData, setFormData] = useState({
        food_type: '',
        quantity: '',
        time_cooked_hour: '12',
        time_cooked_minute: '00',
        time_cooked_ampm: 'PM',
        location: '',
        source: 'household',
    });

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        let hours = parseInt(formData.time_cooked_hour, 10);
        let mins = formData.time_cooked_minute;

        if (formData.time_cooked_ampm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (formData.time_cooked_ampm === 'AM' && hours === 12) {
            hours = 0;
        }

        const time24 = `${hours.toString().padStart(2, '0')}:${mins}`;

        const payload = {
            ...formData,
            time_cooked: time24
        };

        const result = await submitFoodReport(payload);

        setTimeout(() => {
            addDonation(payload); // Dispatch to global site map state
            setResponse(result);
            setLoading(false);
        }, 1500); // simulate network delay for demo
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
            >
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Food Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Food Type</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Utensils size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        name="food_type"
                                        required
                                        placeholder="e.g. Veg Biryani, Leftover pizza"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        onChange={handleChange}
                                        value={formData.food_type}
                                    />
                                </div>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (Meals)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <Package size={18} />
                                    </div>
                                    <input
                                        type="number"
                                        name="quantity"
                                        min="1"
                                        required
                                        placeholder="e.g. 40"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        onChange={handleChange}
                                        value={formData.quantity}
                                    />
                                </div>
                            </div>

                            {/* Grid 2 cols */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Cooked</label>
                                    <div className="relative flex shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 z-10">
                                            <Clock size={18} />
                                        </div>
                                        <div className="flex w-full ml-10 border border-gray-300 rounded-l-lg overflow-hidden relative z-0">
                                            <select
                                                name="time_cooked_hour"
                                                className="w-1/2 bg-white text-gray-700 py-3 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none border-r border-gray-300 cursor-pointer text-center"
                                                onChange={handleChange}
                                                value={formData.time_cooked_hour}
                                            >
                                                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                                    <option key={h} value={h.toString().padStart(2, '0')}>
                                                        {h.toString().padStart(2, '0')}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                name="time_cooked_minute"
                                                className="w-1/2 bg-white text-gray-700 py-3 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm appearance-none cursor-pointer text-center"
                                                onChange={handleChange}
                                                value={formData.time_cooked_minute}
                                            >
                                                {['00', '15', '30', '45'].map((m) => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="relative border-t border-b border-r border-gray-300 rounded-r-lg bg-gray-50 flex items-center shrink-0 w-20">
                                            <select
                                                name="time_cooked_ampm"
                                                className="w-full h-full bg-transparent hover:bg-gray-100 text-gray-700 font-bold px-3 focus:ring-primary-500 focus:border-primary-500 sm:text-sm outline-none cursor-pointer transition-colors appearance-none text-center"
                                                onChange={handleChange}
                                                value={formData.time_cooked_ampm}
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Source Type</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <Tag size={18} />
                                        </div>
                                        <select
                                            name="source"
                                            required
                                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                            onChange={handleChange}
                                            value={formData.source}
                                        >
                                            <option value="household">Household</option>
                                            <option value="restaurant">Restaurant</option>
                                            <option value="event">Event / Wedding</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
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
                                        placeholder="e.g. Chennai, T.Nagar"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                        onChange={handleChange}
                                        value={formData.location}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                'Submit Donation'
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Response Display */}
            {response && (
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200 shadow-md"
                >
                    <div className="flex items-center space-x-3 mb-4 text-green-800">
                        <Info className="w-6 h-6" />
                        <h3 className="text-lg font-bold">Food Report Received</h3>
                    </div>

                    <div className="bg-white rounded-xl p-5 shadow-sm space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-500">Meals Rescued</span>
                            <span className="font-semibold text-gray-900">{formData.quantity}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-500">AI Recommendation</span>
                            <span className="font-semibold text-primary-600">{response.route}</span>
                        </div>

                        {(response.ngo || response.place || response.neighbor) && (
                            <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                <span className="text-gray-500">{response.route.includes('NGO') ? 'Nearest NGO' : 'Matched Entity'}</span>
                                <span className="font-semibold text-gray-900">{response.ngo || response.place || response.neighbor}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-500">Distance</span>
                            <span className="font-semibold text-gray-900">{response.distance}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                            <span className="text-gray-500">Pickup ETA</span>
                            <span className="font-semibold text-gray-900">{response.pickup_eta}</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default FoodForm;
