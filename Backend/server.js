import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectMongoDB from "./config/connectMongoDB.js";
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import managerRoutes from './routes/manager.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://3.93.61.73:3000'],
  credentials: true
}));

app.use('/auth', authRoutes);
app.use('/manager', managerRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectMongoDB();
});