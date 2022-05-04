const express = require("express");
const router = express.Router();
const {
  addTransactions,
  spendPoints,
  pointsBalance,
} = require("../controllers/transactionController");

//POST transactions from the database
router.post("/addtransactions", addTransactions);

// POST route for adding spend points
router.post("/spendpoints", spendPoints);

// Get route for adding spend points
router.get("/pointsbalance", pointsBalance);

module.exports = router;
