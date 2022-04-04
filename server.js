const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// For raw JSON data
app.use(express.json());

// For parsing form data
app.use(express.urlencoded({ extended: false }));

app.use("/api/transaction", require("./routes/addTransaction"));

app.listen(PORT, () => {
  console.log(`API Server now listening on PORT ${PORT}!`);
});
