const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const configureApp = require("../../settings/config.js"); // Ensure this path is correct

const app = express();
app.use(express.json());

// Run your custom config
configureApp(app);

// Database Connection Logic (Optimized for Serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

// The Handler (This replaces app.listen)
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  // Make sure DB is connected before handling the request
  await connectDB();
  return await handler(event, context);
};
