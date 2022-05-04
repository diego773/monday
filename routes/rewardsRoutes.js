const express = require("express");
const router = express.Router();
const {
  addTransactions,
  spendPoints,
  pointsBalance,
} = require("../controllers/transactionController");

//Gets transactions from the database
router.post("/addtransactions", addTransactions);

// POST route for adding spend points
router.post("/spendpoints", spendPoints);

router.get("/pointsbalance", pointsBalance);

// PUT route for updating a transaction
// DELETE route for deleting a transaction
// Return all of the payer points balance for a given user id

// router.get("/", getTransactions);

// router.post("/", postTransaction);
// router.get("/", getSpendPoints);

// router.put("/:id", updateTransactions);

// router.delete("/:id", deleteTransactions);

// router.get("/:id", getPayerPointBalances);

module.exports = router;
