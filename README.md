# Tattoo Booking Manager

**Problem this app solves:** A freelance tattoo artist needs a simple way to track client bookings, session deposits, skin prep notes, and appointment statuses — all in one place.

---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Express.js
- **Database:** MongoDB Atlas (Mongoose)

---

## Setup — run in under 5 minutes

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/lab1-mateuszplizga.git
cd lab1-mateuszplizga
```

### 2. Install dependencies

```bash
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### 3. Create the .env file

Create `server/.env` with:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tattoo-booking?appName=tattoo-booking
PORT=5000
```

> Get your connection string from MongoDB Atlas → Connect → Drivers

### 4. Seed the database

```bash
cd server
node seed.js
```

### 5. Start the app

```bash
cd ..
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

OPEN http://localhost:5173

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/bookings | Get all bookings (with client & artist data) |
| POST | /api/bookings | Create a new booking |
| PUT | /api/bookings/:id | Update a booking |
| DELETE | /api/bookings/:id | Delete a booking |
| GET | /api/clients | List all clients |
| GET | /api/artists | List all artists |
| GET | /api/stats/bookings | Total bookings, deposits, avg session duration |

---

## Features

- Full CRUD for bookings
- Dropdown form with all clients and artists
- Search by client name, artist name, or tattoo description
- Filter by booking status (pending / confirmed / completed / cancelled)
- Auto-refresh every 100 seconds (cleans up with useEffect return)
- Loading and error states in the UI
