import { useState } from 'react';
import { MapPin, Clock, CheckCircle, Home, Phone, X, Truck } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const FoodCard = ({ food }) => {
    const { claimDonation } = useAppContext();
    const [showModal, setShowModal] = useState(false);
    const [claiming, setClaiming] = useState(false);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handleConfirmDelivery = (e) => {
        e.preventDefault();
        setClaiming(true);

        // Simulate logistics processing
        setTimeout(() => {
            setSuccess(true);
            setTimeout(() => {
                setShowModal(false);
                claimDonation(food.id);
            }, 2000); // Wait 2s on success screen before destroying card
        }, 1500);
    };

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group h-full">
                <div className="h-32 bg-primary-100 relative overflow-hidden flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1593113565694-c6f1dc0b1f22?auto=format&fit=crop&q=80')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                    <h3 className="text-2xl font-bold text-primary-800 z-10 px-4 text-center truncate w-full">{food.food_type}</h3>
                    <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
                        {food.quantity} meals
                    </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                    <div className="space-y-3 mb-4">
                        <div className="flex items-start text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 shrink-0" />
                            <span className="line-clamp-2">{food.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-2 text-gray-400 shrink-0" />
                            <span>Ready since: {food.time_cooked}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full flex items-center justify-center space-x-2 py-2.5 font-medium rounded-lg transition-colors border bg-primary-50 text-primary-700 hover:bg-primary-100 border-primary-200"
                    >
                        <span>Claim & Request Delivery</span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md relative"
                        >
                            {!claiming && !success && (
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            )}

                            <div className="p-8">
                                {success ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center py-6"
                                    >
                                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                                            <CheckCircle className="h-8 w-8 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Delivery Confirmed!</h3>
                                        <p className="text-gray-500">
                                            Your delivery partner is on the way to {food.location} to pick up your food and will drop it at your address.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery Details</h2>
                                            <p className="text-sm text-gray-500">Provide your drop-off location and our logistics partner will bring the {food.quantity} meals directly to you.</p>
                                        </div>

                                        <form onSubmit={handleConfirmDelivery} className="space-y-5">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                                                <div className="relative">
                                                    <div className="absolute top-3 left-3 text-gray-400">
                                                        <Home size={18} />
                                                    </div>
                                                    <textarea
                                                        required
                                                        rows="3"
                                                        placeholder="Enter your full exact street address..."
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm resize-none"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                    ></textarea>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                                        <Phone size={18} />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        required
                                                        maxLength="10"
                                                        pattern="[0-9]{10}"
                                                        title="Please enter a valid 10-digit mobile number"
                                                        placeholder="9876543210"
                                                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={claiming}
                                                className={`w-full flex items-center justify-center space-x-2 py-3 px-4 shadow-sm text-sm font-medium text-white rounded-lg transition-colors ${claiming ? 'bg-primary-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                                                    }`}
                                            >
                                                {claiming ? (
                                                    <div className="flex items-center space-x-2">
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        <span>Assigning Delivery Partner...</span>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Truck className="w-5 h-5" />
                                                        <span>Confirm Delivery</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FoodCard;
