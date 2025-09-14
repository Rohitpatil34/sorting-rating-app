# sorting-rating-app

## Introduction

The **Store Rating Platform** is a full-stack web application that enables users to register, log in, and submit ratings (1–5) for stores registered on the platform. The system is role-based, supporting three roles: **System Administrator, Normal User, and Store Owner**. Each role has access to specific functionalities, making the platform secure and organized.

This project is designed to test and demonstrate full-stack development skills, including backend API design, database modeling, frontend UI development, authentication/authorization, and role-based access control.



## Features

### System Administrator

* Add new stores, normal users, and admin users
* Dashboard displaying total users, total stores, and total ratings
* Manage users with role-specific details and filters
* Manage stores with search and sorting
* View all users and stores with ratings

### Normal User

* Register and log in
* Update password after login
* Browse and search stores by name or address
* View store listings with overall rating and their submitted rating
* Submit or update ratings (1–5) for stores

### Store Owner

* Log in and update password
* View users who rated their store
* See the average rating of their store

### General

* Form validations (name, email, address, password)
* Sorting, filtering, and pagination in tables
* Secure authentication and authorization

---

## Tech Stack

* **Frontend:** React.js (with React Router, Redux/Context, Form validation)
* **Backend:** Express.js, Prisma (ORM)
* **Database:** MySQL 
* **Authentication:** JWT-based authentication
* **Styling:** Tailwind CSS 


## Prerequisites

Ensure you have the following installed before setting up the project:

* Node.js (v16+)
* npm or yarn
* MySQL


---

## Installation and Setup

### 1. Clone the repository

```bash
git clone [<repo-url>](https://github.com/Rohitpatil34/sorting-rating-app.git)
cd <repo-folder>store-rating-app
```

### 2. Backend Setup

```bash
# To navigate to backend
cd backend

## Install dependencies
npm install

Configure Environment Variables
Create a .env file in the Backend directory by copying the example.env file.

Now, open the .env file and update the variables with your local database credentials.

# .env (Example for MySQL)
DATABASE_URL="mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/store_ratings_db"
JWT_SECRET="your_super_secret_key_that_is_long_and_random"
Database Migration
Ensure your database server is running and you have created a database named store_ratings_db (or whatever you named it in the DATABASE_URL).

Run the Prisma migration to create all the necessary tables.

npx prisma migrate dev
This will also generate the Prisma Client.

Start the Backend Server
npm run dev
The backend server should now be running, typically on http://localhost:5000.

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env   # configure API base URL
npm start              # start frontend server
```
### 3. Frontend Setup


Open a new terminal window for the client setup.

# Navigate to the frontend directory from the root
cd Frontend

# Install dependencies
npm install
Configure API Connection
Create a .env file in the Frontend directory by copying the example.env file.

Add the following line to this new file. This tells your frontend where to find the backend API.

# client/.env
VITE_API_URL=http://localhost:5000/api
Start the Frontend Server
npm run dev
The React development server should now be running, typically on http://localhost:5173. You can now access the application in your browser!

---

*Generated README for the FullStack Intern Coding Challenge.*
