import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
console.log("MONGO_URI:", process.env.MONGO_URI);
import cors from 'cors';

import { connectDB } from './config/db.js';

import accountRoutes from './routes/AccountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

connectDB();

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
