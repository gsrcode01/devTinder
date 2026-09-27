# ⚡ DevTinder — Where Developers Connect & Collaborate

<div align="center">

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Render-Backend_Live-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)

<br />

**A full-stack networking platform engineered specifically for software engineers, designers, and tech creators to find coding partners, co-founders, and collaborate on projects.**

[🚀 **Live Frontend (Vercel)**](https://dev-tinder-ykawiq6xe-gsrcode01s-projects.vercel.app/) • [⚙️ **Live Backend API (Render)**](https://devtinder-backend-k3hj.onrender.com/) • [💻 **GitHub Repository**](https://github.com/gsrcode01/devTinder)

</div>

---

## 🌟 Highlights & Features

- 🃏 **3D Interactive Swipe Deck**: Swipe right to connect (`interested`) or swipe left to pass (`ignored`) with smooth CSS 3D stack transforms and keyboard shortcuts (`←` and `→`).
- 👥 **10,500+ Active Developer Database**: Pre-seeded with a massive, diverse talent pool of verified developers across global and Indian tech hubs.
- 🔍 **Click-to-Inspect Developer Modal**: Click any candidate card (or press `↑` / `Enter`) to open an in-depth profile modal featuring verified badges, full bio, portfolio links, and complete tech stack breakdown.
- 🎯 **Multi-Criteria Skill & Role Filtering**: Filter developers dynamically by specialized roles (*Frontend*, *Backend*, *Fullstack*, *DevOps*, *Mobile*, *AI/ML*) or specific tech skills (*React*, *Go*, *Rust*, *Python*, *Kubernetes*, etc.).
- 💬 **Real-Time Matches & Chat**: Dedicated conversation threads for all mutual connections with instant typing simulation, quick code snippet inserters, and message search.
- 🛡️ **Dual-Layer Authentication & Route Protection**: JWT tokens supported via both `Authorization: Bearer <token>` request headers and `httpOnly` cookies, preventing unauthorized access across all routes.
- ⚡ **Redux API Optimization**: Smart store caching prevents redundant network calls, making navigation instant.
- 🎨 **Modern Dark Aesthetics**: 100% pure Tailwind CSS, ambient glows, rotating laser borders, and Caveat handwritten developer notes.

---

## 🏗️ System Architecture

```
devTinder/
├── Backend/                 # Express.js REST API & Database Models
│   ├── src/
│   │   ├── config/          # MongoDB Atlas Mongoose connection
│   │   ├── middlewares/     # JWT & Cookie Auth verification
│   │   ├── models/          # User & ConnectionRequest Mongoose schemas
│   │   ├── routes/          # Auth, Profile, User Feed, Connection APIs
│   │   ├── scripts/         # High-speed 10,500+ user batch seeder
│   │   ├── utils/           # Validation & data sanitizer helpers
│   │   └── app.js           # Server entry point & CORS configuration
│   └── package.json
│
├── frontend/devTinderUI/    # Vite + React 19 Frontend
│   ├── src/
│   │   ├── components/      # UI components (Feed, SwipeDeck, Sidebar, Header, Modal)
│   │   ├── pages/           # Feed, Login, Profile, Messages, Connections, Requests, Settings
│   │   ├── utils/           # Redux Store, Slices, Axios API Client
│   │   ├── App.jsx          # Route definitions & protected route guards
│   │   └── index.css        # Tailwind CSS & Marquee animation keyframes
│   ├── vercel.json          # SPA routing fallback configuration
│   └── package.json
└── README.md
```

---

## 📡 REST API Documentation

| Endpoint | Method | Protection | Description |
| :--- | :---: | :---: | :--- |
| `/login` | `POST` | Public | Authenticates user, sets cookie & returns `{ token, data }` |
| `/signup` | `POST` | Public | Registers a new developer account and returns JWT token |
| `/logout` | `POST` | Public | Clears session cookie and invalidates client token |
| `/profile/view` | `GET` | `Bearer / Cookie` | Returns currently logged-in user profile details |
| `/profile/edit` | `PATCH` | `Bearer / Cookie` | Updates user details (avatar, skills, bio, age, etc.) |
| `/profile/password` | `PATCH` | `Bearer / Cookie` | Validates old password and updates hashed password |
| `/feed` | `GET` | `Bearer / Cookie` | Paginated feed of unexplored developers (`?page=1&limit=30`) |
| `/request/send/:status/:toUserId` | `POST` | `Bearer / Cookie` | Sends connection action (`interested` or `ignored`) |
| `/user/requests/received` | `GET` | `Bearer / Cookie` | Fetches all pending received connection requests |
| `/request/review/:status/:requestId` | `POST` | `Bearer / Cookie` | Reviews request (`accepted` or `rejected`) |
| `/user/connections` | `GET` | `Bearer / Cookie` | Returns list of all mutual connections |

---

## 🛠️ Local Development Setup

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/gsrcode01/devTinder.git
cd devTinder
```

### 3. Backend Setup
```bash
cd Backend
npm install

# Start development server
npm run dev
# Server will run on http://localhost:3000
```

### 4. Seed 10,500+ Developers (Optional)
```bash
# Inside the Backend directory:
node src/scripts/seedTenThousandUsers.js
```

### 5. Frontend Setup
```bash
cd ../frontend/devTinderUI
npm install

# Start Vite development server
npm run dev
# App will open at http://localhost:5173
```

---

## 🌍 Live Deployments

- **Frontend Client**: [https://dev-tinder-ykawiq6xe-gsrcode01s-projects.vercel.app/](https://dev-tinder-ykawiq6xe-gsrcode01s-projects.vercel.app/)
- **Backend API**: [https://devtinder-backend-k3hj.onrender.com/](https://devtinder-backend-k3hj.onrender.com/)

---

## 👤 Test Credentials

You can use any of the seeded developers or create a fresh account:
- **Email**: `priya.sharma@example.com`
- **Password**: `DevPassword@123`

---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
Built with ❤️ for developers worldwide to connect, build, and ship great software.
