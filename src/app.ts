import express from "express";
import workerRoutes from "./routes/worker.routes";

// Initializing the express app
const app = express();

// Using express json
app.use(express.json());

// Adding the 'workers' routes to the app using 'api' as base
app.use("/api/workers", workerRoutes);

export default app;