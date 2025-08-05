import app from "./app";
import dotenv from "dotenv";

// Exposing .env file to the app
dotenv.config();

// Getting the port from the environment
const PORT = process.env.PORT ?? 8080;

// Make the app run on the desired port
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}/api`);
});
