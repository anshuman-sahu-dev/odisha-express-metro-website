# 🚇 Odisha Express Metro — Transit Web App

> *Odisha's First Metro — Your Cultural Ride Starts Here*

![Odisha Express Logo](assets/PNG/Odisha%20Express%20Logo.jpg)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Pages & Sections](#pages--sections)
- [Metro Lines](#metro-lines)
- [Metro Card Types](#metro-card-types)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Learning Outcomes](#learning-outcomes)
- [Developer](#developer)

---

## 📖 About the Project

**Odisha Express** is a fully functional, dark-themed metro transit web application built using **HTML, CSS, and Vanilla JavaScript**. It simulates a real-world metro management system for **Bhubaneswar, Odisha** India's emerging smart city with live-style timetables, multi-line route maps, fare matrices, smart card registration, card recharge, and an AI-powered chatbot assistant named **KalingaBot**.

The project is designed to replicate the experience of a production-grade public transit app with a sleek sci-fi / HUD-inspired UI aesthetic, real JSON-driven data, client-side routing, and modular JavaScript architecture all without any JavaScript framework or build tools.

---

## 🌐 Live Demo

🔗 **[https://odisha-express-metro-website.vercel.app/](https://odisha-express-metro-website.vercel.app/)**

---

## ✨ Features

- 🏠 **Hero Section** — Bold headline, network status badge, and interactive draggable Smart Card preview
- 🕐 **Live Time Table** — Station-wise, direction-wise live departure board with real-time countdown timers
- 🗺️ **Route Explorer** — All 6 metro lines with expandable station lists and active node counts
- 💰 **Fare Matrix** — Line-by-line fare charts (6 matrices) accessible via accordion dropdowns
- 🪪 **Metro Card Registration** — Multi-type card registration modal (Blue, Green, Purple, Orange, Golden) with passenger detail form
- 💳 **Card Recharge** — In-app balance recharge with ₹50 to ₹2000 denomination options
- 💸 **Payment Gateway UI** — Payment mode selection supporting Google Pay, PhonePe, Paytm & RuPay
- 👤 **User Profile Dashboard** — Editable profile with Tickets/Passes, Card Recharge, View Balance, Language, and Support options
- 🤖 **KalingaBot** — AI-powered chatbot assistant inspired by the spirit of Odisha for metro journey guidance
- 🚨 **SOS Button** — Quick-access emergency button always visible in the navbar
- 🌗 **Light / Dark Theme Toggle** — Full theme switching with CSS variables
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🔐 **Auth System** — Dedicated Login / Register pages (`index.html`, `register.html`)
- 🧭 **Client-Side Router** — SPA-style navigation across all sections via `router.js`

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure and multi-page layout |
| **CSS3** | Custom dark theme, animations, HUD-style UI, and responsive design |
| **Vanilla JavaScript (ES6+)** | App logic, routing, data rendering, chatbot, SOS, and theme management |
| **JSON** | Static data source for lines, stations, fares, and timetable |
| **Vercel** | Deployment and hosting |

> No JavaScript framework, no npm, no build tools — pure HTML, CSS & JS.

---

## 📄 Pages & Sections

The app uses a **client-side router** for SPA-style navigation across sections within `main.html`:

```
odisha-express/
│
├── index.html          → Login / Authentication Page
├── register.html       → New User Registration Page
└── main.html           → Core App (SPA with client-side routing)
    │
    ├── 🏠  HOME         → Hero headline + Network status + Draggable Smart Card
    ├── 🕐  TIME TABLE   → Transit line selector + Station selector + Live departure board
    ├── 🗺️  ROUTES       → 6 Metro line listings with station counts and expandable details
    ├── 💰  FARE         → 6 Line-wise fare matrices in accordion layout
    ├── 🪪  METRO CARD   → Card registration modal + Card type selector
    ├── 👤  PROFILE      → User dashboard with tickets, recharge, balance, support
    ├── 💳  CARD RECHARGE → Balance display + Denomination selector + Payment gateway
    └── 🤖  KALINGABOT   → Floating chatbot widget — "Your YatraAI"
```

---

## 🚇 Metro Lines

| Line | Code | Route | Stations |
|---|---|---|---|
| 🔵 Blue Line | L1 | Bhubaneswar North → Bhubaneswar South | 25 |
| 🟢 Green Line | L2 | Airport → Old Town | 25 |
| 🟠 Orange Line | L3 | Rasulgarh → Patia | 25 |
| 🟣 Purple Line | L4 | AIIMS → Infocity | 25 |
| 🟡 Yellow Line | L5 | Unit-1 → Baramunda | 25 |
| 🩷 Pink Line | L6 | Lingaraj → Jaydev Vihar | 25 |

> **Network Status: OPTIMAL** — 150 Active Nodes across all lines

---

## 🪪 Metro Card Types

| Card | Target Group | Theme |
|---|---|---|
| 🔵 Blue Card | College Students | Blue |
| 🟢 Green Card | Senior Citizens | Green |
| 🟣 Purple Card | Women | Purple |
| 🟠 Orange Card | Govt. Employees | Orange |
| 🟡 Golden Card | Tourists | Gold |

---

## 📁 Project Structure

```
odisha-express/
│
├── index.html                    # Login / Auth entry page
├── main.html                     # Core single-page app
├── register.html                 # New user registration page
│
├── .env                          # Environment config
│
├── assets/
│   ├── icons/                    # UI icons and SVG assets
│   └── images/                   # Illustrations, card visuals, backgrounds
│
├── CSS/
│   ├── styles.css                # Global base styles
│   ├── theme.css                 # Light / dark theme CSS variables
│   ├── animations.css            # Keyframe animations and transitions
│   ├── responsive.css            # Media queries for all breakpoints
│   ├── auth.css                  # Login and register page styles
│   ├── home.css                  # Hero section styles
│   ├── timetable.css             # Time table section styles
│   ├── routes.css                # Routes section styles
│   ├── fare.css                  # Fare matrix styles
│   ├── metrocard.css             # Metro card registration styles
│   └── profile.css               # User profile dashboard styles
│
├── data/
│   ├── lines.json                # Metro line definitions (name, code, color, endpoints)
│   ├── stations.json             # Station data for all 6 lines
│   ├── fares.json                # Fare matrix data per line
│   └── timetable/                # Timetable data files per line / station
│
└── js/
    ├── config.js                 # App-wide configuration constants
    ├── router.js                 # Client-side SPA router
    ├── data.js                   # JSON data loader and parser
    ├── auth.js                   # Login / register / session logic
    ├── home.js                   # Hero section interactions
    ├── timetable.js              # Live departure board rendering
    ├── routes.js                 # Route explorer rendering
    ├── fare.js                   # Fare matrix accordion logic
    ├── metrocard.js              # Card registration form and modal logic
    ├── profile.js                # Profile dashboard and account management
    ├── chatbot.js                # KalingaBot — AI chatbot logic
    ├── sos.js                    # SOS emergency button logic
    └── theme.js                  # Light / dark theme toggle
```

---

## 🚀 Getting Started

No build tools, no npm, no dependencies needed. Just clone and open.

### 1. Clone the Repository

```bash
git clone https://github.com/anshuman-sahu-dev/odisha-express-metro-website.git
```

### 2. Navigate to the Project Folder

```bash
cd odisha-express-metro-website
```

### 3. Open in Browser

```bash
# On macOS
open index.html

# On Windows
start index.html

# Or use Live Server (VS Code extension) for best experience
# Right-click index.html → Open with Live Server
```

> ⚡ Zero setup — pure front-end project, runs instantly in any modern browser!

---

## 🧠 Learning Outcomes

Building this project reinforced and expanded skills across:

- ✅ Architecting a **multi-module Vanilla JS** app without any framework
- ✅ Building a **client-side SPA router** for seamless page navigation
- ✅ Consuming and rendering **JSON data** dynamically across all sections
- ✅ Designing a **HUD / sci-fi dark UI** with CSS custom properties and variables
- ✅ Writing **modular CSS** with separate files per section for scalability
- ✅ Implementing **CSS keyframe animations** and smooth transitions
- ✅ Building **multi-step modal flows** (card registration → recharge → payment gateway)
- ✅ Integrating a floating **AI chatbot widget** (KalingaBot)
- ✅ Creating a **real-time departure board** UI with live countdown timers
- ✅ Handling **authentication flows** across multiple HTML pages
- ✅ Building a **fully responsive layout** with dedicated responsive.css
- ✅ Deploying a static multi-page site to **Vercel**

---

## 📬 Contact

For any queries, feedback, or collaboration:

[![Email](https://img.shields.io/badge/Email-toanshumansahu@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:toanshumansahu@gmail.com) <br>
[![Phone](https://img.shields.io/badge/Phone-+91_78549_39308-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+917854939308) <br>
[![GitHub](https://img.shields.io/badge/GitHub-anshuman--sahu--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anshuman-sahu-dev) <br>
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Anshuman_Sahu-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anshuman-sahu-371a6535b/) <br>
[![Location](https://img.shields.io/badge/Location-Brahmapur,_Odisha,_India-FF5722?style=for-the-badge&logo=googlemaps&logoColor=white)](#) <br>

---

## 📄 License

<p align="center">This project is open for <strong>viewing and inspiration.</strong> Please do not <strong>copy or redistribute</strong> the design or content <strong>without permission.</strong></p>

<p align="center">© 2026 <strong>WanderFramez_</strong>. All rights reserved.</p>

---

<p align="center">Designed & Built by <strong>Anshuman Sahu</strong> · Deployed on <a href="https://vercel.com">Vercel</a></p>

## 👨‍💻 Developer

<div align="center">

### ✨ Made with ❤️ by

# 🧑‍💻 Anshuman Sahu

![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&pause=1000&color=00BFFF&center=true&vCenter=true&width=500&lines=Front-End+Developer;HTML+%7C+CSS+%7C+JavaScript;Building+real-world+UIs+from+scratch;One+project+at+a+time+🚀)

---

[![Email](https://img.shields.io/badge/Email-toanshumansahu@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:toanshumansahu@gmail.com) <br>
[![Phone](https://img.shields.io/badge/Phone-+91_78549_39308-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:+917854939308) <br>

---

[![GitHub](https://img.shields.io/badge/GitHub-anshuman--sahu--dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anshuman-sahu-dev)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://odisha-express-metro-website.vercel.app/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)

---

![Profile Views](https://komarev.com/ghpvc/?username=anshuman-sahu-dev&color=00BFFF&style=for-the-badge&label=PROFILE+VIEWS)

</div>
