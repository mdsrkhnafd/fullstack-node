const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const path = require("path");

// Set NODE_ENV to production for Netlify
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Load environment variables
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "../../.env.production") });

const app = express();
app.use(express.json());

// Database Connection Logic (Optimized for Serverless)
let cachedDb = null;

const connectDB = async () => {
  // Return immediately if already connected
  if (cachedDb) {
    console.log("✅ Using cached MongoDB connection");
    return cachedDb;
  }

  try {
    console.log("🔌 Connecting to MongoDB...");
    const connection = await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
      serverSelectionTimeoutMS: 5000, // Fast timeout for serverless
      socketTimeoutMS: 45000,
      connectTimeoutMS: 5000,
    });

    cachedDb = connection;
    console.log("✅ MongoDB connected successfully");
    return connection;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw new Error(`Database connection failed: ${err.message}`);
  }
};

// Simple CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is running", status: "ok" });
});

// Mount routes directly
// Note: Netlify redirects /api/* to the function, so we need to handle both /api/auth and /auth
const authRouter = require("../../src/auth/auth.router.js");
const usersRouter = require("../../src/users/users.router.js");
const tasksRouter = require("../../src/tasks/tasks.router.js");

// Mount at both /api/auth and /auth for flexibility
app.use("/api/auth", authRouter);
app.use("/auth", authRouter);

app.use("/api/users", usersRouter);
app.use("/users", usersRouter);

app.use("/api", tasksRouter);
app.use("/", tasksRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.method} ${req.url} not found`,
  });
});

// The Handler (This replaces app.listen)
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectDB();
    const response = await handler(event, context);
    return response;
  } catch (error) {
    console.error("Handler error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: error.message || "Internal server error",
      }),
    };
  }
};
