const Rewards = require("../models/rewardsModel");

// Get transactions
// Route GET /api/rewards
// Private route
const getTransactions = (req, res) => {
  res.status(200).json({ message: "get transactions" });
};

// POST transactions
// Route POST /api/rewards/newtransaction
// Private route
const newTransaction = async (req, res) => {
  try {
    const { payer, points } = req.body;
    if (!payer || !points) {
      return res
        .status(400)
        .json({ message: "Please provide payer and points" });
    }

    const newTransaction = await Rewards.create({
      payer,
      points,
    });

    if (newTransaction) {
      return res.status(200).json({
        payer: newTransaction.payer,
        points: newTransaction.points,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Get Points
// Route GET /api/rewards/points
// Private route
const getSpendPoints = async (req, res) => {
  try {
    const { payer, points } = req.body;

    // Match the payer and retrive points
    const payerPoints = await Rewards.find({ payer });
    // const pointsBalance = await Rewards.compare(payer, payerPoints.points);

    // If the payer does not exist, return an error
    if (!payerPoints) {
      return res.status(400).json({ message: "Payer does not exist" });
    }

    // If the payer exists, return the payer's points
    return res.status(200).json({
      payer: payerPoints.payer,
      points: payerPoints.points,
    });

    // res.status(200).json({ message: "get spend points" });
  } catch (error) {
    console.error(error);
  }
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
  newTransaction,
  getSpendPoints,
  updateTransactions,
  deleteTransactions,
  getPayerPointBalances,
};
