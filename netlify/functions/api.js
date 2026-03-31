// netlify/functions/api.js
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

// Your existing routes go here
router.get("/hello", (req, res) => {
  res.json({ message: "Hello from Node.js API!" });
});

app.use("/.netlify/functions/api", router);
module.exports.handler = serverless(app);
