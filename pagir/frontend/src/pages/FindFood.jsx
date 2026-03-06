import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FoodCard from '../components/FoodCard';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FindFood = () => {
    const { donations } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredFood, setFilteredFood] = useState(donations);

    useEffect(() => {
        const results = donations.filter(food =>
            food.food_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            food.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFood(results);
    }, [searchTerm, donations]);

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Find Nearby Food
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Browse fresh, safely preserved surplus food in your community.
                    </motion.p>
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by food type or location..."
                            className="block w-full pl-12 pr-4 py-4 border-0 shadow-md rounded-xl text-gray-900 focus:ring-2 focus:ring-primary-500 focus:outline-none text-lg transition-shadow bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredFood.length > 0 ? (
                        filteredFood.map((food) => (
                            <motion.div
                                key={food.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <FoodCard food={food} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            No food found matching your search. Try different keywords.
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default FindFood;
