import { motion } from 'framer-motion';
import { Leaf, Heart, Zap, ShieldCheck } from 'lucide-react';
import Hero from '../components/Hero';
import UserPortal from '../components/UserPortal';

const Home = () => {
    return (
        <div className="font-sans text-gray-900">
            <Hero />

            <UserPortal />

            {/* How it Works Section */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest mb-2">The Process</h2>
                        <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">Smart Distribution System</h3>
                        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">Our AI engine instantly matches your surplus food to the perfect destination, guaranteeing zero waste.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-green-200 via-blue-200 to-orange-200 z-0"></div>

                        {[
                            { title: "AI Analysis", desc: "Checks quality and safety rules (< 4 hrs).", icon: <Leaf className="w-8 h-8 text-white" />, color: "bg-primary-500" },
                            { title: "Household Match", desc: "1-2 meals? Neighbors claim it instantly.", icon: <Heart className="w-8 h-8 text-white" />, color: "bg-pink-500" },
                            { title: "NGO Pickup", desc: "20+ meals safely transported to shelters.", icon: <ShieldCheck className="w-8 h-8 text-white" />, color: "bg-blue-500" },
                            { title: "Biogas Fallback", desc: "Unsafe or stale? Becomes clean energy.", icon: <Zap className="w-8 h-8 text-white" />, color: "bg-orange-500" }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className={`w-24 h-24 rounded-2xl ${step.color} shadow-lg shadow-${step.color}/30 flex items-center justify-center transform group-hover:-translate-y-2 transition-transform duration-300 mb-6 rotate-3 group-hover:rotate-6`}>
                                    {step.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                                <p className="text-gray-500 font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
