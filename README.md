# 🛒 E-Commerce Admin Dashboard

A robust, full-stack E-commerce Administration Panel built with **Next.js 15 (App Router)**. This application manages product inventory, visualizes sales data in real-time, and secures administrative access using custom JWT authentication and Middleware.

### 🚀 **[View Live Deployment](https://ecommerce-dashboard-hcwk.vercel.app)**
*(Login required - See "Test Credentials" below)*

---

## ✨ Key Features

### 🛡️ **Advanced Security**
- **Custom JWT Authentication**: Secure session management using `jose` with HttpOnly cookies.
- **Middleware Protection**: Intelligent route guarding that redirects unauthorized users instantly.
- **Admin Onboarding Portal**: A secure, token-protected "backdoor" route to register new administrators.

### 📦 **Inventory Management**
- **Full CRUD Operations**: Create, Read, Update, and Delete products with a polished UI.
- **Cloudinary Integration**: Drag-and-drop image uploads that are automatically optimized and hosted on the cloud.
- **Smart State Management**: Solved complex state synchronization issues for reliable form handling.

### 📊 **Data Visualization**
- **Interactive Charts**: Real-time analytics powered by **Recharts** to visualize inventory distribution.
- **Dashboard Stats**: Instant overview of Total Inventory Value, Stock Levels, and Category breakdowns.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Actions)
- **Language**: TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Styling**: Tailwind CSS & Lucide React Icons
- **Image Storage**: Cloudinary
- **Deployment**: Vercel

---

## ⚙️ Local Setup Guide

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/As00-00/ecommerce_dashboard.git](https://github.com/As00-00/ecommerce_dashboard.git)
cd ecommerce_dashboard

### 2. Install Dependencies
```bash
npm install

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following keys:
```Code snippet
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# Authentication Secrets
JWT_SECRET=any_long_random_string_here
ADMIN_CREATION_TOKEN=my-super-secret-token-123

# Master Admin (Initial Access)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword123


### 4. Run the Development Server
```bash
npm run dev

Open http://localhost:3000 in your browser.


### Author
Aryan Sankhla - Full Stack Developer




