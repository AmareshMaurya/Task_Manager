import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import connectDB from "./config/db.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// DB
connectDB();

// API routes
app.use("/api/tasks", taskRoutes);

// serve frontend
const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "frontend", "dist")));

// ✅ FIXED wildcard route (Express 5 safe)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
