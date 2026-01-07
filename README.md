# 🛒 E-Commerce Admin Dashboard

A robust, full-stack E-commerce Administration Panel built with **Next.js 15 (App Router)**. This application manages product inventory, visualizes sales data in real-time, and secures administrative access using custom JWT authentication and Middleware.

### 🚀 **[View Live Deployment](https://ecommerce-dashboard-hcwk.vercel.app)**
*(Login required - See "google drive)*

---

## ✨ Key Features

### 🛡️ Advanced Security
- Custom JWT Authentication using HttpOnly cookies
- Middleware-based route protection
- Secure admin creation via token

### 📦 Inventory Management
- Full CRUD product management
- Cloudinary image uploads
- Reliable state synchronization

### 📊 Data Visualization
- Recharts-powered analytics dashboard
- Inventory & category insights

---

## 🛠️ Tech Stack
- Next.js 15 (App Router)
- TypeScript
- MongoDB + Mongoose
- Tailwind CSS
- Cloudinary
- Vercel

---

## ⚙️ Local Setup Guide

### 1. Clone the Repository
```bash
git clone https://github.com/As00-00/ecommerce_dashboard.git
cd ecommerce_dashboard
```


### 2. Install Dependencies
```bash
npm install
```


### 3. Configure Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your mongodb uri
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your cloudinary cloud name
JWT_SECRET=your jwt secret key
ADMIN_CREATION_TOKEN=admin_creation token
ADMIN_EMAIL=admin_email
ADMIN_PASSWORD=admin_password
```
Open http://localhost:3000

### 4.Author
Aryan Sankhla - full Stack Developer

