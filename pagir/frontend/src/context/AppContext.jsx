import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    // Authentication State
    const [user, setUser] = useState(null);

    // Initial State sets
    const [donations, setDonations] = useState([
        { id: 1, food_type: 'Vegetable Biryani', quantity: 40, location: 'T.Nagar, Chennai', time_cooked: '14:30', source: 'household', type: 'donor', pos: [13.04, 80.23] },
        { id: 2, food_type: 'Leftover Pizza slices', quantity: 5, location: 'Adyar, Chennai', time_cooked: '18:00', source: 'restaurant', type: 'donor', pos: [13.00, 80.25] },
        { id: 3, food_type: 'Wedding Buffet', quantity: 150, location: 'Anna Nagar, Chennai', time_cooked: '15:45', source: 'event', type: 'donor', pos: [13.08, 80.21] },
        { id: 4, food_type: 'Sambar & Rice', quantity: 15, location: 'Velachery, Chennai', time_cooked: '12:00', source: 'household', type: 'donor', pos: [12.98, 80.22] },
        { id: 5, food_type: 'Idli & Coconut Chutney', quantity: 8, location: 'Mylapore, Chennai', time_cooked: '08:30', source: 'household', type: 'donor', pos: [13.03, 80.26] },
        { id: 6, food_type: 'Assorted Breads & Pastries', quantity: 20, location: 'Besant Nagar, Chennai', time_cooked: '11:00', source: 'restaurant', type: 'donor', pos: [13.00, 80.27] },
        { id: 7, food_type: 'South Indian Thali Leftovers', quantity: 50, location: 'Nungambakkam, Chennai', time_cooked: '14:00', source: 'event', type: 'donor', pos: [13.06, 80.24] },
        { id: 8, food_type: 'Chicken Gravy & Parotta', quantity: 12, location: 'Tambaram, Chennai', time_cooked: '20:30', source: 'restaurant', type: 'donor', pos: [12.92, 80.11] },
        { id: 9, food_type: 'Fruits & Salads', quantity: 30, location: 'Guindy, Chennai', time_cooked: '10:15', source: 'event', type: 'donor', pos: [13.01, 80.21] },
        { id: 10, food_type: 'Chapathi with Dal', quantity: 25, location: 'Odalakkudi, Chennai', time_cooked: '19:00', source: 'household', type: 'donor', pos: [12.90, 80.22] },
        { id: 11, food_type: 'Fried Rice & Noodles', quantity: 60, location: 'Porur, Chennai', time_cooked: '21:00', source: 'restaurant', type: 'donor', pos: [13.03, 80.16] }
    ]);

    const [ngos, setNgos] = useState([
        { id: 101, name: 'Hope Shelter', desc: 'Needs 50+ meals', type: 'ngo', pos: [13.09, 80.28] },
        { id: 102, name: 'Community Fridge', desc: 'Accepts <10 meals', type: 'ngo', pos: [13.07, 80.26] },
        { id: 103, name: 'Annai Ashram', desc: 'Needs 100+ meals', type: 'ngo', pos: [13.11, 80.25] },
        { id: 104, name: 'Karunai Illam', desc: 'Needs 20-50 meals', type: 'ngo', pos: [13.06, 80.21] },
        { id: 105, name: 'Street Fridge (Velachery)', desc: 'Accepts any quantity', type: 'ngo', pos: [12.97, 80.22] },
    ]);

    const [biogasPlants, setBiogasPlants] = useState([
        { id: 201, name: 'GreenEnergy BioGas', desc: 'Capacity: 500kg/day', type: 'biogas', pos: [13.12, 80.22] },
        { id: 202, name: 'EcoWaste Solutions', desc: 'Capacity: 1000kg/day', type: 'biogas', pos: [12.95, 80.18] },
        { id: 203, name: 'City Organic Plant', desc: 'Capacity: 250kg/day', type: 'biogas', pos: [13.15, 80.20] },
    ]);

    const [impact, setImpact] = useState({
        meals: 4520,
        waste: 904,
        co2: 1356,
        energy: 452
    });

    // Telegram Bot mock queries
    const [queries, setQueries] = useState([
        { id: 1001, user: '@restaurant_owner1', platform: 'Telegram', text: 'Hi, I have 50 extra meals left from my buffet, can you pick up?', time: '09:45 AM', status: 'pending' },
        { id: 1002, user: '@john_doe', platform: 'Telegram', text: 'How do I register my biogas plant?', time: '11:15 AM', status: 'pending' },
        { id: 1003, user: '@charity_worker', platform: 'Telegram', text: 'Our shelter urgently needs 30 meals tonight. Is there any active donation?', time: '02:30 PM', status: 'pending' },
        { id: 1004, user: '@volunteer_mike', platform: 'Telegram', text: 'I am available to drive tonight in T.Nagar.', time: '04:00 PM', status: 'resolved' },
    ]);

    // Helper to get random near Chennai coordinates since users type strings
    const getRandomChennaiPos = () => {
        const lat = 12.9 + Math.random() * 0.25;
        const lng = 80.15 + Math.random() * 0.15;
        return [lat, lng];
    };

    const addDonation = (donationData) => {
        const newDonation = {
            id: Date.now(),
            ...donationData,
            type: 'donor',
            pos: getRandomChennaiPos()
        };
        setDonations(prev => [newDonation, ...prev]);

        // Update Global Impact Stats seamlessly
        setImpact(prev => ({
            ...prev,
            meals: prev.meals + parseInt(donationData.quantity || 0, 10),
            co2: prev.co2 + parseInt(donationData.quantity || 0, 10) * 0.3, // Mock multiplier
            waste: prev.waste + parseInt(donationData.quantity || 0, 10) * 0.2
        }));
    };

    const claimDonation = (id) => {
        setDonations(prev => prev.filter(donation => donation.id !== id));
    };

    const resolveQuery = (id) => {
        setQueries(prev => prev.map(q => q.id === id ? { ...q, status: 'resolved' } : q));
    };

    const addBiogasPlant = (plantData) => {
        const newPlant = {
            id: Date.now(),
            name: plantData.name,
            desc: `Capacity: ${plantData.capacity}kg/day`,
            type: 'biogas',
            pos: getRandomChennaiPos()
        };
        setBiogasPlants(prev => [newPlant, ...prev]);

        setImpact(prev => ({
            ...prev,
            energy: prev.energy + parseInt(plantData.capacity || 0, 10) * 0.5
        }));
    };

    const loginUser = (userData) => setUser(userData);
    const logoutUser = () => setUser(null);

    // Derived State for the Map
    const allMapLocations = [...donations.map(d => ({
        id: d.id,
        name: d.source === 'restaurant' ? `Restaurant: ${d.food_type}` : `Donor (${d.location})`,
        desc: `${d.quantity} Meals (${d.food_type})`,
        type: d.type,
        pos: d.pos
    })), ...ngos, ...biogasPlants];

    return (
        <AppContext.Provider value={{
            user, loginUser, logoutUser,
            donations, ngos, biogasPlants, impact, allMapLocations, queries,
            addDonation, addBiogasPlant, claimDonation, resolveQuery
        }}>
            {children}
        </AppContext.Provider>
    );
};
