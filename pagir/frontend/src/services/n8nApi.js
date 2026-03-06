// Simple service to emulate and communicate with n8n webhook
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n.example.com/webhook/food-report';

export const submitFoodReport = async (payload) => {
    try {
        // For the hackathon demo, if webhook is not real, we can mock the AI response
        // But we will attempt the actual POST first.
        // To make demo reliable, we'll return a mock response if fetch fails.

        // Attempt fetch
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            return await response.json();
        }
        throw new Error("Webhook failed");
    } catch (error) {
        console.warn("n8n Webhook failed, using fallback mock data for demo.");
        return generateMockAiResponse(payload);
    }
};

const generateMockAiResponse = (payload) => {
    const { quantity, food_type, time_cooked } = payload;
    const qty = parseInt(quantity, 10) || 0;

    let isExpired = false;

    // Logic rule: > 4 hours age -> biogas
    if (time_cooked) {
        const [cookHours, cookMinutes] = time_cooked.split(':').map(Number);
        const now = new Date();
        const cookTime = new Date();
        cookTime.setHours(cookHours, cookMinutes, 0, 0);

        // Calculate discrepancy in hours
        let diffInHours = (now - cookTime) / (1000 * 60 * 60);

        // If time was entered for late yesterday (e.g. 23:00 and it's 01:00 now)
        if (diffInHours < 0) {
            diffInHours += 24;
        }

        if (diffInHours > 4) {
            isExpired = true;
        }
    }

    if (isExpired) {
        return {
            route: "Biogas Plant",
            place: "GreenEnergy BioGas",
            distance: "3.2 km",
            pickup_eta: "45 minutes (Waste Transport)"
        };
    }

    // Standard routing based on quantity for safe food
    if (qty > 100) {
        return {
            route: "NGO Pickup",
            ngo: "Hope Shelter",
            distance: "2.1 km",
            pickup_eta: "15 minutes"
        };
    } else if (qty >= 20) {
        return {
            route: "Community Kitchen",
            ngo: "City Central Kitchen",
            distance: "1.5 km",
            pickup_eta: "25 minutes"
        };
    } else if (qty >= 3) {
        return {
            route: "Local Sharing",
            place: "Community Fridge 4",
            distance: "0.5 km",
            pickup_eta: "10 minutes"
        };
    } else {
        return {
            route: "Household Match",
            neighbor: "Neighbor seeking 2 meals",
            distance: "0.2 km",
            pickup_eta: "5 minutes"
        };
    }
};
