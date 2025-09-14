# ⭐ Store Rating Platform

## 📌 Introduction
The **Store Rating Platform** is a full-stack web application that enables users to register, log in, and submit ratings (1–5) for stores registered on the platform.  
The system is role-based, supporting three roles: **System Administrator, Normal User, and Store Owner**.  
Each role has access to specific functionalities, making the platform secure and organized.

This project demonstrates **full-stack development skills** such as:
- Backend API design  
- Database modeling  
- Frontend UI development  
- Authentication & Authorization  
- Role-based access control  

---

## 🚀 Features

### 👨‍💻 System Administrator
- Add new stores, normal users, and admin users  
- Dashboard displaying total users, total stores, and total ratings  
- Manage users with role-specific details and filters  
- Manage stores with search and sorting  
- View all users and stores with ratings  

### 🙍 Normal User
- Register and log in  
- Update password after login  
- Browse and search stores by name or address  
- View store listings with overall rating and their submitted rating  
- Submit or update ratings (1–5) for stores  

### 🏪 Store Owner
- Log in and update password  
- View users who rated their store  
- See the average rating of their store  

### 🌐 General
- Form validations (name, email, address, password)  
- Sorting, filtering, and pagination in tables  
- Secure authentication and authorization  

---

## 🛠️ Tech Stack
- **Frontend:** React.js (React Router, Redux/Context, Form Validation)  
- **Backend:** Express.js, Prisma (ORM)  
- **Database:** MySQL  
- **Authentication:** JWT-based authentication  
- **Styling:** Tailwind CSS  

---

## 📦 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  
- [MySQL](https://dev.mysql.com/downloads/)  

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Rohitpatil34/sorting-rating-app.git
cd sorting-rating-app
```

### 2️⃣ Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install
```

#### 🔑 Configure Environment Variables
Create a `.env` file inside the backend directory (you can copy from example.env):

```env
# .env (Example for MySQL)
DATABASE_URL="mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/store_ratings_db"
JWT_SECRET="your_super_secret_key_that_is_long_and_random"
```

#### 🗄️ Database Migration
Make sure MySQL is running and you've created a database named `store_ratings_db` (or update the name in DATABASE_URL).
Run Prisma migrations to set up tables:

```bash
npx prisma migrate dev
```

This will also generate the Prisma Client.

#### ▶️ Start Backend Server
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

#### 🌍 Configure API Connection
Create a `.env` file in the frontend directory (copy from example.env) and set:

```env
VITE_API_URL=http://localhost:5000/api
```

#### ▶️ Start Frontend Server
```bash
npm run dev
```

---

