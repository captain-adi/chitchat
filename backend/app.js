import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Import routes
import authRoutes from "./src/routes/auth_routes.js";
import userRoutes from "./src/routes/user_routes.js";

// Use routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

//Error handler

app.use((err, req, res) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

export default app;
