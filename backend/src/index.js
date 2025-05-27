import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // ✅ import
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import excerciseRoutes from "./routes/excercise.routes.js"
import { connectDB } from './lib/db.js';
import path from "path";
const __dirname = path.resolve();

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})); 
const PORT = process.env.PORT || 5001;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/exercise', excerciseRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }
app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
  connectDB(); 
});
