const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const configureApp = require("./settings/config.js");

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

const app = express();
app.use(express.json());

// Configure routes
configureApp(app);

// Logging for debug
console.log("Environment:", process.env.NODE_ENV);
console.log("Database URL:", process.env.DATABASE_URL);
console.log("Database Name:", process.env.DATABASE_NAME);

// -----------------------------
// MongoDB Connection
// -----------------------------
let cachedDb = null;

const connectDB = async () => {
  if (cachedDb) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    cachedDb = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }
};

// -----------------------------
// Serverless Handler
// -----------------------------
const handler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  return await handler(event, context);
};

// -----------------------------
// Local Development Server
// -----------------------------
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  connectDB()
    .then(() => {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
      console.error("Failed to start server:", err.message);
    });
}
