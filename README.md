# PAGIR 

**AI-Powered Food Waste Reduction & Redistribution**

PAGIR is a mobile application designed to reduce food waste by connecting surplus food donors—households, restaurants, and shops—with NGOs, community kitchens, and biogas plants. The app leverages AI-powered automation to efficiently match donors with recipients, minimize food wastage, and support communities in need.

---

## **Problem Overview**
- Millions of tons of edible food are wasted every year while millions go hungry.  
- Surplus food from households, restaurants, and shops often goes unused and ends up in landfills.  
- Existing donation systems are inefficient and fragmented, making timely redistribution difficult.

**Target Users / Beneficiaries:**  
- **Donors:** Households, restaurants, supermarkets.  
- **Recipients:** NGOs, community kitchens, families in need, biogas plants.  
- **Indirect beneficiaries:** Local communities, environment (reduced carbon footprint).

---

## **Solution Overview**
**PAGIR** automates the food redistribution process using a mobile app:


**Key Features:**
1. **Donor-Friendly Upload:** Quickly list surplus food with quantity, type, and expiry.  
2. **AI-Powered Matching:** Automatically find the most suitable recipients nearby.  
3. **Automated Notifications & Scheduling:** Real-time notifications and pickup scheduling.  
4. **Impact Tracking:** Dashboard for tracking donations, saved waste, and environmental impact.  
5. **Integration with Biogas / Composting:** Route unfit food to biogas plants to ensure zero waste.  
6. **Secure & Verified:** Trusted donors and recipient organizations for safe distribution.

---

## **Technology Stack**
- **Framework:** React Native (Expo)  
- **UI:** React Native Paper, Tailwind Native (optional)  
- **Maps & Location:** React Native Maps  
- **Backend & Automation:** n8n Cloud workflows, Firebase  
- **AI/Matching:** Custom AI-powered donor-recipient matching algorithm  

---

## **Sustainable Development Goals (SDGs) Alignment**
- **SDG 2 – Zero Hunger:** Redistributing surplus food to communities in need.  
- **SDG 12 – Responsible Consumption & Production:** Reducing food waste and promoting sustainable consumption.  
- **SDG 13 – Climate Action:** Minimizing carbon footprint from food waste.  
- **SDG 11 – Sustainable Cities & Communities:** Strengthening community networks through collaboration.  

---

## **Project Structure**
pagir-mobile/
│
├─ App.js # Entry point of the mobile app
├─ components/ # Reusable UI components
├─ screens/ # App screens (Home, Donor, Recipient, Dashboard)
├─ assets/ # Images, icons, and other assets
├─ n8n-workflows/ # Automation workflows for AI matching
└─ README.md # Project documentation
