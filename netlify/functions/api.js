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
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
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
const authRouter = require("../../src/auth/auth.router.js");
const usersRouter = require("../../src/users/users.router.js");
const tasksRouter = require("../../src/tasks/tasks.router.js");

app.use("/auth", authRouter);
app.use("/users", usersRouter);
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
