import express from "express";
import workerRoutes from "./routes/worker.routes";

// Initializing the express app
const app = express();

// Using express json
app.use(express.json());

// Adding the 'workers' routes to the app using 'api' as base
app.use("/api/workers", workerRoutes);

// Fallback for unmatched routes
app.use((_req, res) => {
  res.status(404).json({ message: "not found" });
});

export default app;