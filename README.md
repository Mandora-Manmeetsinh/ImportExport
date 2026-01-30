w# Jala Garment & Textiles - Import/Export Portal

A premium MERN stack web application for an international garment manufacturing and export business. This portal showcases high-fashion garment collections, provides official industry compliance documentation, and enables global inquiries.

## 🚀 Features

- **Premium UI/UX**: High-fashion aesthetic with glassmorphism, smooth animations, and luxury typography.
- **Product Catalog**: Expanded 18-product collection across 5 categories (Men, Women, Kids, Fabrics, Seasonal).
- **Compliance Documentation**: Interactive gallery for official Government of India certificates (IEC, etc.).
- **Global Inquiries**: Direct WhatsApp integration and inquiry forms for international buyers.
- **Secure Admin Panel**: Role-based access to manage products, categories, and inquiries.
- **Mobile Responsive**: Fully optimized for desktops, tablets, and smartphones.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Framer Motion, Lucide React, Vanilla CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Atlas/Local fallback).
- **Authentication**: JWT (JSON Web Tokens).

## 📂 Project Structure

```text
ImportExport/
├── Frontend/           # React/Vite application
│   ├── src/assets/     # Visual assets and professional photography
│   ├── src/components/ # Reusable UI components (Navbar, Footer, etc.)
│   └── src/pages/      # Main application pages (Home, About, Catalog, etc.)
└── Backend/            # Node.js/Express server
    ├── controllers/    # API logic
    ├── models/         # Database schemas
    └── routes/         # API endpoints
```

## ⚙️ Setup & Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or a Cloud Atlas URI)

### 1. Clone & Install
```bash
git clone <repository-url>
cd ImportExport

# Install Backend dependencies
cd Backend
npm install

# Install Frontend dependencies
cd ../Frontend
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `Backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Running the Application
**Backend:**
```bash
cd Backend
npm start
```

**Frontend:**
```bash
cd Frontend
npm run dev
```

## 🛡️ Admin Access
- **Default Admin**: `admin@elitewear.com` / `admin123`
- **Admin Portal**: Access via `/jala-admin-portal-2025`

## 📄 License
All rights reserved © 2026 Jala Garment & Textiles.
