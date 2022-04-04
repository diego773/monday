const express = require("express");
const router = express.Router();
const {
  getTransactions,
  postTransaction,
  getSpendPoints,
  updateTransactions,
  deleteTransactions,
  getPayerPointBalances,
} = require("../controllers/transactionController");

//Gets transactions from the database
// POST route for saving a new transaction
// GET route for retrieving a spend points
router
  .route("/")
  .get(getTransactions)
  .post(postTransaction)
  .get(getSpendPoints);

// PUT route for updating a transaction
// DELETE route for deleting a transaction
// Return all of the payer points balance for a given user id
router
  .route("/:id")
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
