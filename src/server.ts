import app from "./app";
import dotenv from "dotenv";
import { sequelize } from "./config/database";

// Exposing .env file to the app
dotenv.config();

// Getting the port from the environment
const PORT = process.env.PORT ?? 8080;

// Connect to the oracle database
sequelize.authenticate().then(() => {
  // Make the app run on the desired port
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}/api`);
  });
}).catch(err => {
  console.error("Error trying to connect to the Oracle DB:", err);
});