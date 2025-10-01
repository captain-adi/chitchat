import express from "express";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// IMPORT ROUTES
import userRoutes from "./src/routes/user_routes.js";

app.use("/api/v1/user", userRoutes);

app.listen(process.env.DB_PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.DB_PORT || 3000}`);
});
