const { Transaction } = require("../models/transaction");

// Get transactions
// Route GET /api/transaction
// Private route
const getTransactions = (req, res) => {
  res.status(200).json({ message: "get transactions" });
};

// POST transactions
// Route POST /api/transaction
// Private route
const postTransaction = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "save new transaction" });
};

// Get Points
// Route GET /api/points
// Private route
const getSpendPoints = (req, res) => {
  res.status(200).json({ message: "get spend points" });
};

// PUT transactions
// Route PUT /api/transaction/:id
// Private route
const updateTransactions = (req, res) => {
  res.status(200).json({ message: `Update transaction ${req.params.id}` });
};

// DELETE transactions
// Route DELETE /api/transaction/:id
// Private route
const deleteTransactions = (req, res) => {
  res.status(200).json({ message: `Delete transaction ${req.params.id}` });
};

// GET points
// Route GET /api/point/:id
// Private route
const getPayerPointBalances = (req, res) => {
  res.status(200).json({ message: `Return all payer points ${req.params.id}` });
};

module.exports = {
  getTransactions,
  postTransaction,
  getSpendPoints,
  updateTransactions,
  deleteTransactions,
  getPayerPointBalances,
};
