import express from "express";
// import workers from "./routes/workers";

// Initializing the express app
const app = express();

// Using express json
app.use(express.json());

// Adding the 'workers' routes to the app using 'api' as base
// app.use("/api", workers);

export default app;