const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// For raw JSON data
app.use(express.json());

// For parsing form data
app.use(express.urlencoded({ extended: true }));

app.use("/api/rewards", require("./routes/rewardsRoutes"));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rewards");

console.log("MongoDB Connected");

app.listen(PORT, () => {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
