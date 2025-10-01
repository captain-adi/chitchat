import connectDB from "./src/config/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.DB_PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.DB_PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });
