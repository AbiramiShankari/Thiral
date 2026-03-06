import { motion } from 'framer-motion';
import BiogasForm from '../components/BiogasForm';

const BiogasRegister = () => {
    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-extrabold text-gray-900 tracking-tight"
                    >
                        Partner for Clean Energy
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto"
                    >
                        Register your biogas plant to receive expired surplus food, converting waste into green energy and completing the circular economy.
                    </motion.p>
                </div>

                <BiogasForm />

            </div>
        </div>
    );
};

export default BiogasRegister;
