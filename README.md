# WasteReturn 

**Every Waste Has Value. Sort Right, Earn More.**

WasteReturn is a comprehensive waste management platform that incentivizes proper waste disposal through a points-based reward system. Unlike traditional waste services that charge for pickup, WasteReturn pays citizens for their waste based on type, quality, and sorting accuracy.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-planning-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

---

##  Table of Contents

- [Vision & Mission](#vision--mission)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Team](#team)
- [License](#license)

---

##  Vision & Mission

### Vision
To create a cleaner, more sustainable Nigeria where every citizen is empowered to participate in waste management and earn from their environmental contribution.

### Mission
To transform waste from a "problem to dispose of" into a "resource to earn from" by building technology that makes recycling accessible, rewarding, and trackable for every household.

---

##  Problem Statement

### The Waste Crisis in Urban Nigeria

| Challenge | Impact |
|-----------|--------|
| **Improper Disposal** | 60% of waste ends up in drains, waterways, or illegal dumps |
| **Low Recycling Rates** | Only 12% of recyclable waste actually gets recycled |
| **Mixed Waste** | Contamination makes recycling difficult and expensive |
| **No Incentive** | Citizens pay for waste collection with no financial benefit |
| **Informal Sector** | Scavengers pick only high-value items, leaving the rest |
| **Environmental Damage** | Blocked drainage causes flooding; burning waste pollutes air |

### The Opportunity

Citizens want to do the right thing, but:
- They don't know **how** to sort properly
- There's no **reward** for sorting
- Pickup is **inconsistent**
- They can't track their **environmental impact**

---

##  Solution

WasteReturn addresses these challenges by providing:

- **Points-Based Rewards:** Earn points for every kilogram of waste recycled
- **Tiered Points System:** Higher value for better sorting (Gold/Silver/Bronze multipliers)
- **All Waste Types:** From high-value copper to low-value nylons, every waste has value
- **Convenient Pickup:** Schedule pickups or use self-service drop-off centers
- **Real-Time Tracking:** Track your driver, your points, and your environmental impact
- **Multiple Redemption Options:** Cash out, pay bills, shop at partner stores, or donate to charity

---

##  Key Features

###  For Citizens
- Register with phone number (USSD option for feature phones)
- Schedule one-time or recurring pickups
- Track driver in real-time on map
- View points balance and transaction history
- Redeem points for cash, bills, or rewards
- Learn proper sorting with visual guides
- Track environmental impact (CO2 saved, trees saved)

###  For Drivers
- View optimized pickup routes
- Scan household QR codes
- Weigh waste with Bluetooth-connected scale
- Verify sorting quality with photo evidence
- Apply quality multipliers
- Generate pickup completion codes
- Issue contamination warnings

###  For Frontdesk Agents
- Process walk-in drop-offs
- Scan driver pickup codes for verification
- Handle cash payments for non-registered users
- Print receipts
- End-of-day reconciliation

###  For Admins
- Real-time waste flow dashboard
- Driver performance metrics
- Points liability management
- Audit logs of all actions
- Deleted records recovery
- Regulatory reporting (LASEPA)

---

##  Tech Stack

| Layer | Technology | Status |
|-------|------------|--------|
| **Frontend** | Next.js 14+ (React), TypeScript, TailwindCSS |  Selected |
| **Backend** | Next.js API Routes (Node.js) | Selected |
| **Database** | MongoDB |  Selected |
| **Authentication** | JWT + HTTP-only Cookies |  Selected |
| **Mobile Strategy** | PWA (Progressive Web App) | Selected |
| **Real-time** | WebSockets (Socket.io) |  Evaluating |
| **Maps** | Google Maps Platform | Evaluating |
| **Payments** | Paystack | Evaluating |
| **SMS** | Termii (Nigerian provider) |  Evaluating |
| **Hardware** | Bluetooth Scale API, Thermal Printers | Evaluating |

---

##  Project Structure
wastereturn/
├── 📂 docs/ # All project documentation
│ ├── PRD.md # Product Requirements Document
│ ├── User-Stories.md # 66+ user stories across 11 epics
│ ├── Epics-List.md # Complete feature list by epic
│ ├── Points-Table.md # Complete points reference (7 categories)
│ ├── Sorting-Algorithm.md # Points calculation formula
│ ├── Architecture.md # System architecture diagrams
│ ├── Design-System-and-Visuals.md # UI/UX guidelines
│ ├── Personas.md # Detailed user personas
│ └── README.md # This file
│
├── 📂 frontend/ # Next.js frontend application
│ ├── 📂 public/ # Static assets
│ ├── 📂 src/ # Source code
│ │ ├── 📂 components/ # Reusable UI components
│ │ ├── 📂 pages/ # Next.js pages
│ │ ├── 📂 services/ # API services
│ │ ├── 📂 contexts/ # React contexts
│ │ ├── 📂 hooks/ # Custom React hooks
│ │ ├── 📂 utils/ # Utility functions
│ │ └── 📂 config/ # Configuration files
│ └── package.json
│
├── 📂 backend/ # Node.js backend (if separate)
│ ├── 📂 src/
│ │ ├── 📂 models/ # MongoDB models
│ │ ├── 📂 controllers/ # Business logic
│ │ ├── 📂 routes/ # API routes
│ │ ├── 📂 middleware/ # Auth, logging, error handling
│ │ └── 📂 utils/ # Helper functions
│ └── package.json
│
├── 📂 database/ # Database scripts
│ ├── 📂 seeds/ # Seed data
│ └── README.md
│
├── .env.example # Environment variables template
├── .gitignore # Git ignore file
├── README.md # Project overview (this file)
└── package.json # Root package.json


---

##  Documentation

All project documentation is in the `/docs` folder:

| Document | Description | Link |
|----------|-------------|------|
| **PRD.md** | Complete product requirements, goals, and MVP scope | [View](./docs/PRD.md) |
| **User-Stories.md** | 66+ user stories with real scenarios | [View](./docs/User-Stories.md) |
| **Epics-List.md** | 11 epics with complete feature lists | [View](./docs/Epics-List.md) |
| **Points-Table.md** | Complete points reference (7 categories, 50+ items) | [View](./docs/Points-Table.md) |
| **Sorting-Algorithm.md** | Points calculation formula with examples | [View](./docs/Sorting-Algorithm.md) |
| **Architecture.md** | System architecture diagrams and flows | [View](./docs/Architecture.md) |
| **Design-System-and-Visuals.md** | UI/UX guidelines, colors, icons | [View](./docs/Design-System-and-Visuals.md) |
| **Personas.md** | Detailed user personas (6 personas) | [View](./docs/Personas.md) |

---

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sundayconfidencechinecherem/wastereturn.git
   cd wastereturn

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if separate)
cd ../backend
npm install

cp .env.example .env.local
# Edit .env.local with your configuration

# Frontend
cd frontend
npm run dev

# Backend (if separate)
cd ../backend
npm run dev

http://localhost:3000

 Roadmap
Phase 0: Foundation (Current) - Q2 2025
* Product Requirements Document
* User Stories & Personas
* Design System
* Architecture Design
* Tech Stack Selection
* Repository Setup
Phase 1: MVP (Months 1-3)
* User Registration (Phone + OTP)
* Basic Waste Categories (20 types)
* QR Code Generation
* Driver Check-in/out
* Manual Weight Entry
* Points Calculation (Base only)
* Frontdesk Basic Operations
Phase 2: Enhanced Features (Months 4-6)
* Pickup Scheduling
* Bluetooth Scale Integration
* Sorting Quality Verification
* Waste Category Expansion (50+)
* Driver Route Optimization
* Audit Logging
* Driver Pickup Codes
Phase 3: Advanced Features (Months 7-9)
* Reward Redemption
* Cash-out via Bank (Paystack)
* Real-time Driver Tracking
* Educational Content
* Referral Program
* Analytics Dashboard
Phase 4: Scale (Months 10-12)
* Self-service Kiosks
* USSD Integration
* AI Sorting Assistant
* Carbon Credit Tracking
* API for Partners

### Team
Role	                                 Name
Product Manager	[confidence chinecherem]
Lead Developer	[confidence chinecherem]
UI/UX Designer	[confidence chinecherem]
Technical Architect	[confidence chinecherem]
Project Lead	[confidence chinecherem]

 Contact
* Project Link: https://github.com/sundayconfidencechinecherem/wastereturn
* Documentation: https://github.com/yourusername/wastereturn/docs
* Issues: https://github.com/yourusername/wastereturn/issues



## Made for a cleaner Nigeria
