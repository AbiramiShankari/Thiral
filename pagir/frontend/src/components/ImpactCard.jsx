import { motion } from 'framer-motion';

const ImpactCard = ({ title, value, icon, colorClass, gradientClass, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={`relative overflow-hidden rounded-2xl shadow-xl border border-gray-100 bg-white group hover:-translate-y-1 transition-transform duration-300 p-6`}
        >
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-10 blur-2xl transition-all duration-500 group-hover:scale-150 ${gradientClass}`}></div>

            <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-xl ${colorClass} bg-opacity-20 flex-shrink-0`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                    <h4 className="text-3xl font-extrabold text-gray-900 mt-1">{value}</h4>
                </div>
            </div>
        </motion.div>
    );
};

export default ImpactCard;
