import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowDownCircle, CloudRain, BatteryCharging } from 'lucide-react';
import ImpactCard from '../components/ImpactCard';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useAppContext } from '../context/AppContext';

// Demo Data
const MONTHLY_DATA = [
    { name: 'Jan', meals: 400, co2: 120, energy: 200 },
    { name: 'Feb', meals: 650, co2: 195, energy: 325 },
    { name: 'Mar', meals: 800, co2: 240, energy: 400 },
    { name: 'Apr', meals: 1200, co2: 360, energy: 600 },
    { name: 'May', meals: 1500, co2: 450, energy: 750 },
    { name: 'Jun', meals: 2500, co2: 750, energy: 1250 },
];

const Dashboard = () => {
    const { impact } = useAppContext();
    const [stats, setStats] = useState({ meals: 0, waste: 0, co2: 0, energy: 0 });

    // Simulate counting animation up to current impact context values
    useEffect(() => {
        let startTime;
        const duration = 1500;

        const animate = (time) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setStats({
                meals: Math.floor(impact.meals * easeOutQuart),
                waste: Math.floor(impact.waste * easeOutQuart),
                co2: Math.floor(impact.co2 * easeOutQuart),
                energy: Math.floor(impact.energy * easeOutQuart)
            });

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, [impact]);

    return (
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Real-Time Impact Dashboard
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2 text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Track how much food we've saved and the planetary emissions prevented.
                    </motion.p>
                </div>

                {/* Top Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <ImpactCard
                        title="Meals Rescued"
                        value={stats.meals.toLocaleString()}
                        icon={<ShieldCheck className="w-8 h-8 text-green-600" />}
                        colorClass="bg-green-500"
                        gradientClass="bg-green-200"
                        delay={0.1}
                    />
                    <ImpactCard
                        title="Food Waste Prevented"
                        value={`${stats.waste} kg`}
                        icon={<ArrowDownCircle className="w-8 h-8 text-blue-600" />}
                        colorClass="bg-blue-500"
                        gradientClass="bg-blue-200"
                        delay={0.2}
                    />
                    <ImpactCard
                        title="CO2 Emissions Saved"
                        value={`${stats.co2} kg`}
                        icon={<CloudRain className="w-8 h-8 text-teal-600" />}
                        colorClass="bg-teal-500"
                        gradientClass="bg-teal-200"
                        delay={0.3}
                    />
                    <ImpactCard
                        title="Energy Generated"
                        value={`${stats.energy} kWh`}
                        icon={<BatteryCharging className="w-8 h-8 text-orange-600" />}
                        colorClass="bg-orange-500"
                        gradientClass="bg-orange-200"
                        delay={0.4}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Chart 1 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">Monthly Rescued Meals</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MONTHLY_DATA}>
                                    <defs>
                                        <linearGradient id="colorMeals" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="meals" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorMeals)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Chart 2 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 font-sans">CO2 Reduction & Energy Trend</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={MONTHLY_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dx={-10} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="co2" name="CO2 Saved (kg)" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="energy" name="Energy (kWh)" stroke="#f97316" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
