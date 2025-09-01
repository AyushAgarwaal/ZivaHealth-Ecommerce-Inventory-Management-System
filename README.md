# MERN E-Commerce Inventory

Simple MERN stack project with product, stock, and order management.

---

## 🔧 Setup

### Backend (server)
```bash
cd server
npm install


Create .env in server/:

PORT=4000
MONGO_URI=your_mongo_atlas_uri
TAX_RATE=0.1

cd server/scripts
RUN npm run seed.js

*/ After database seeded successfully */

RUN npm run dev
```

### Frontend (Client)
```bash
cd client
npm install
npm run dev
```

Open: http://localhost:5173