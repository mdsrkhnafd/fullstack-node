const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const configureApp = require("../../settings/config.js");

const app = express();
app.use(express.json());
configureApp(app);

// Keep connection outside the handler to reuse it
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
  // Turn off background waiting so the function returns immediately after the response
  context.callbackWaitsForEmptyEventLoop = false;
  await connectToDatabase();
  return await handler(event, context);
};
