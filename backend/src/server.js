import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js";
import protect from './middleware/authMiddleware.js';
import opportunityRoutes from "./routes/opportunityRoutes.js";

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
