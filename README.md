# Wanderlust 🏡

**Wanderlust** is a full-stack, Airbnb-inspired travel listing platform where users can explore stays, create their own listings, and share reviews — built with the MVC architecture on Node.js & Express, with MongoDB as the database.

## 🔗 Live Demo

👉 [https://wanderlust-5fdm.onrender.com/listings](https://wanderlust-5fdm.onrender.com/listings)

> ⏳ Note: The app is hosted on Render's free tier, so the first load may take 30–50 seconds while the server wakes up.

<!-- 📸 Screenshots: add 2–3 screenshots of the app here (home page, listing page, map view) — this section makes a big difference for recruiters. Delete this comment once added. -->

## ✨ Features

- **Listings** — create, edit, and delete property listings with images, price, location & category
- **Authentication & Authorization** — sign up / login with Passport.js; only the owner can edit or delete their listing or review
- **Reviews & Ratings** — logged-in users can review listings with star ratings
- **Image Uploads** — listing images are uploaded and served via Cloudinary
- **Interactive Maps** — listing locations are geocoded and shown on a Mapbox map with a marker & popup
- **Search & Filters** — search destinations and filter listings by category
- **Validation & Error Handling** — server-side validation, flash messages, and a custom error page

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | EJS (templating), Bootstrap 5, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | Passport.js (Local Strategy), express-session |
| **Media & Maps** | Cloudinary (image storage), Mapbox (geocoding & maps) |
| **Deployment** | Render |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account
- Cloudinary and Mapbox accounts (free tiers work)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/techDhiraj053/wanderlust.git
cd wanderlust

# 2. Install dependencies
npm install

# 3. Create a .env file in the root folder (see below)

# 4. Start the server
node app.js
```

### Environment Variables

Create a `.env` file with your own keys:

```env
MAPBOX_TOKEN=your_mapbox_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret
```

## 📁 Project Structure

```
wanderlust/
├── controllers/     # Route logic (listings, reviews, users)
├── models/          # Mongoose schemas (Listing, Review, User)
├── routes/          # Express routers
├── views/           # EJS templates (layouts, listings, users)
├── public/          # CSS & client-side JavaScript
├── utils/           # Error handling & async wrapper
├── middleware.js    # Auth, ownership & validation middleware
└── app.js           # Entry point
```

## 🔮 Future Improvements

- Wishlist / favourites for listings
- Booking flow with date selection
- Payment integration

## 👨‍💻 Author

**Dhiraj Kumar Singh** — Full Stack Developer (MERN)
[GitHub](https://github.com/techDhiraj053) · [LinkedIn](https://www.linkedin.com/in/dhirajkr/)
