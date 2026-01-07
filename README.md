# 🛒 E-Commerce Admin Dashboard

A robust, full-stack E-commerce Administration Panel built with **Next.js 15 (App Router)**. This application manages product inventory, visualizes sales data in real-time, and secures administrative access using custom JWT authentication and Middleware.

### 🚀 **[View Live Deployment](https://ecommerce-dashboard-hcwk.vercel.app)**
*(Login required - See "Test Credentials" below)*

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
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
JWT_SECRET=any_long_random_string_here
ADMIN_CREATION_TOKEN=my-super-secret-token-123
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123
```
Open http://localhost:3000

### 4.Author
Aryan Sankhla - full Stack Developer

