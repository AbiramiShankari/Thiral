import { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import { useAppContext } from '../context/AppContext';

const MapPage = () => {
    const { allMapLocations } = useAppContext();
    const [activeLocation, setActiveLocation] = useState(null);

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Live Food Distribution Map
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Track high-demand areas, view active surplus points, and see our partner NGOs and Biogas plants.
                    </motion.p>
                </div>

                {/* Legend */}
                <div className="max-w-4xl mx-auto mb-8 flex flex-wrap justify-center gap-6">
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-green-500 border border-green-700"></span>
                        <span className="text-sm font-medium text-gray-700">Food Donors</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-blue-500 border border-blue-700"></span>
                        <span className="text-sm font-medium text-gray-700">NGOs / Shelters</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-orange-500 border border-orange-700"></span>
                        <span className="text-sm font-medium text-gray-700">Biogas Plants</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-4 h-4 rounded-full bg-red-500/30 border border-red-500"></span>
                        <span className="text-sm font-medium text-gray-700">Hunger Heatmap</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <MapView locations={allMapLocations} activeLocation={activeLocation} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col h-[600px] overflow-hidden"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-4">Active Locations</h3>
                        <div className="overflow-y-auto pr-2 space-y-4 flex-grow">
                            {allMapLocations.map((loc) => (
                                <div
                                    key={loc.id}
                                    onClick={() => setActiveLocation(loc)}
                                    className={`p-4 rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer ${activeLocation?.id === loc.id ? 'bg-primary-50 border-primary-300 ring-2 ring-primary-500' : 'bg-gray-50 border-gray-100'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{loc.name}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{loc.desc}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${loc.type === 'donor' ? 'bg-green-100 text-green-700 border border-green-200' :
                                            loc.type === 'ngo' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                                'bg-orange-100 text-orange-700 border border-orange-200'
                                            }`}>
                                            {loc.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default MapPage;
