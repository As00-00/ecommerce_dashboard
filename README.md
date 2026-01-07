🚀 Live Demo
View Live Deployment (Login required - See "Test Credentials" below)

✨ Key Features
🛡️ Advanced Security
Custom JWT Authentication: Implemented via jose with HttpOnly cookies for secure session management.

Middleware Protection: Automatic redirection for unauthorized access on protected routes.

Admin Onboarding Portal: A secure "backdoor" to register new admins, protected by a secret environment token.

📦 Inventory Management
Full CRUD Operations: Create, Read, Update, and Delete products seamlessly.

Cloudinary Integration: Drag-and-drop image uploads that are automatically optimized and hosted on the cloud.

Smart State Management: Solved complex state issues (like "sticky" checkboxes) using React hooks and strict type checking.

📊 Data Visualization
Interactive Charts: Real-time bar charts powered by Recharts to visualize inventory distribution by Category and Brand.

Dashboard Stats: Instant overview of Total Inventory Value and Low Stock Alerts.

🛠️ Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Database: MongoDB (Mongoose ODM)

Styling: Tailwind CSS

Icons: Lucide React

Deployment: Vercel

⚙️ Local Setup Instructions
Clone the repository

Bash

git clone https://github.com/As00-00/ecommerce_dashboard.git
cd ecommerce_dashboard
Install dependencies

Bash

npm install
Set up Environment Variables Create a .env file in the root directory:

Code snippet

MONGODB_URI=your_mongodb_string
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
JWT_SECRET=your_random_secret_string
ADMIN_CREATION_TOKEN=secret_token_for_onboarding
ADMIN_EMAIL=master@admin.com
ADMIN_PASSWORD=master_password
Run the development server

Bash

npm run dev
🔐 Test Credentials
To test the application, you can use these demo credentials (or create your own via the Onboard page):

Email: admin@example.com

Password: securepassword123
