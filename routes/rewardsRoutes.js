const express = require("express");
const router = express.Router();
const {
  getTransactions,
  newTransaction,
  getSpendPoints,
  updateTransactions,
  deleteTransactions,
  getPayerPointBalances,
} = require("../controllers/transactionController");

//Gets transactions from the database
router.get("/", getTransactions);

// POST route for saving a new transaction
router.post("/newtransaction", newTransaction);

// GET route for retrieving a spend points
router.get("/points", getSpendPoints);

// PUT route for updating a transaction
// DELETE route for deleting a transaction
// Return all of the payer points balance for a given user id
router
  .route("/:payer")
  .put(updateTransactions)
  .delete(deleteTransactions)
  .get(getPayerPointBalances);

// router.get("/", getTransactions);

// router.post("/", postTransaction);
// router.get("/", getSpendPoints);

// router.put("/:id", updateTransactions);

// router.delete("/:id", deleteTransactions);

// router.get("/:id", getPayerPointBalances);

module.exports = router;
