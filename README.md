# MERN Bank Account System

A comprehensive Bank Account Management system built with the MERN stack (MongoDB, Express.js, React, Node.js). This project provides a complete solution for managing bank accounts, checking balances, and performing transactions (deposits and withdrawals) with a modern and interactive user interface.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [API Endpoints](#api-endpoints)

## Features

### Account Management
- **Create Accounts:** Users can open new bank accounts specifying their details (Name, ID, Account Type, Gender, and Initial Balance).
- **Minimum Balance:** Enforces a minimum initial balance of 1000.
- **Account Types:** Supports 'Savings' and 'Current' account types.
- **Account Status:** Accounts can be marked as 'Active' or 'Deactivated'.
- **Edit Accounts:** Facility to update account details such as name, account ID, type, and gender.

### Transactions
- **Deposits:** Add funds securely to an existing active account.
- **Withdrawals:** Withdraw funds, ensuring the balance doesn't drop below limits.
- **Transaction History:** View all past transactions (deposits and withdrawals) linked to a specific account ID.

### User Interface
- **Modern Design:** Built with Tailwind CSS and DaisyUI features (Forest theme).
- **Interactive Modals:** Uses modal popups for forms like editing account details.
- **Notifications:** Integrated React Hot Toast for success and error notifications.
- **Responsive Layout:** Ensures seamless experience across different screen sizes.

## Technologies Used

### Frontend
- **React 19** with Vite
- **React Router DOM** for navigation
- **Tailwind CSS** & **DaisyUI** for styling (Forest theme)
- **Axios** for API requests
- **React Hot Toast** for notifications
- **React Icons** for UI iconography

### Backend
- **Node.js** & **Express.js** for the server framework
- **MongoDB** & **Mongoose** for the database and object modeling
- **CORS** for cross-origin resource sharing
- **Dotenv** for environment variable management

## Project Structure
```
MERN Project/
├── backend/                  # Express server & MongoDB models
│   ├── src/
│   │   ├── controllers/      # Request handlers for accounts & transactions
│   │   ├── models/           # Mongoose models (AccountModel, Transaction, etc.)
│   │   ├── routes/           # API route definitions
│   │   └── server.js         # Entry point for the backend
│   ├── package.json
│   └── .env                  # Environment Variables
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page-level components
│   │   ├── App.jsx           # Main App component with routing
│   │   └── index.css         # Global CSS (Tailwind imports)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Database (Local or Cloud like MongoDB Atlas)

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd "MERN Project/backend"
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Ensure you have a `.env` file in the `backend` folder with the necessary configuration:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *The server will typically run at `http://localhost:5000`.*

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd "MERN Project/frontend"
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically be accessible at `http://localhost:5173`.*

## API Endpoints

### Accounts API (`/api/accounts`)
- `POST /` - Create a new account
- `GET /` - Get all accounts
- `GET /:id` - Get account details by MongoDB ID
- `PUT /:id` - Update account details
- `DELETE /:id` - Delete/Deactivate an account

### Transactions API (`/api/transactions`)
- `POST /deposit` - Deposit amount to an account
- `POST /withdraw` - Withdraw amount from an account
- `GET /:accountId` - Retrieve transaction history for a specific account

---
*Developed with ❤️ using the MERN Stack.*
