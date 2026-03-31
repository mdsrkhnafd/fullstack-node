const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const configureApp = require("../../settings/config.js"); // Adjust path if needed

const app = express();
app.use(express.json());
configureApp(app);

// MongoDB Connection (must be outside the handler for reuse)
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  cachedDb = await mongoose.connect(process.env.DATABASE_URL, {
    dbName: process.env.DATABASE_NAME,
  });
  return cachedDb;
}

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  await connectToDatabase(); // Ensure DB is connected
  return await handler(event, context);
};
