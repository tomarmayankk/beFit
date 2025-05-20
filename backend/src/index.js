import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // ✅ import
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser()); // ✅ use it here

const PORT = process.env.PORT || 5001;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
  connectDB();
});
