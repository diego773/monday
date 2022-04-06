const express = require("express");
const router = express.Router();
const {
  getTransactions,
  addTransaction,
  addPoints,
  getPayerPointBalance,
} = require("../controllers/transactionController");

//Gets transactions from the database
router.get("/", getTransactions);

// POST route for saving a new transaction
router.post("/addtransaction", addTransaction);

// GET route for retrieving a spend points
router.post("/addpoints", addPoints);

// PUT route for updating a transaction
// DELETE route for deleting a transaction
// Return all of the payer points balance for a given user id

// router.get("/", getTransactions);

// router.post("/", postTransaction);
// router.get("/", getSpendPoints);

// router.put("/:id", updateTransactions);

// router.delete("/:id", deleteTransactions);

// router.get("/:id", getPayerPointBalances);
router.get("/balance", getPayerPointBalance);

module.exports = router;
