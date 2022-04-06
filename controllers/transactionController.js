const db = require("../models/rewardsModel");

// Get transactions Return all payer point balances.
// Route GET /api/rewards
// Private route
const getTransactions = async (req, res) => {
  try {
    const transactions = await db.find();
    if (transactions) {
      return res.status(200).json(transactions);
    }

    return res.status(404).json({ message: "No transactions found" });
  } catch (error) {
    console.log(error);
  }
};

// POST transactions
// Route POST /api/rewards/newtransaction
// Private route
const addTransaction = async (req, res) => {
  try {
    const { payer, points } = req.body;
    if (!payer || !points) {
      return res
        .status(400)
        .json({ message: "Please provide payer and points" });
    }

    const newTransaction = await db.create({
      payer,
      points,
    });

    if (newTransaction) {
      return res.status(200).json({
        _id: newTransaction._id,
        payer: newTransaction.payer,
        points: newTransaction.points,
        timestamps: newTransaction.timestamps,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// Get Points Spend points using the rules above and return a list of
// Route POST /api/rewards/addpoints
// Private route
const addPoints = async (req, res) => {
  try {
    const { payer, points } = req.body;
    // Check if the points are less than 0, if they are subtract from the matching payer

    if (points < 0) {
      // Match the payer and the points
      // const payerPointBalance = await db.findOne({ payer });

      // Subtract the points from the payer
      const newPayerPointBalance = await db.findOneAndUpdate(
        { payer },
        { $inc: { points: +points } },
        { new: true }
      );

      // Return the new payer point balance
      return res.status(200).json(newPayerPointBalance);
    }

    const newTransaction = await db.create({
      payer,
      points,
    });

    if (newTransaction) {
      return res.status(200).json({
        _id: newTransaction._id,
        payer: newTransaction.payer,
        points: newTransaction.points,
        timestamps: newTransaction.timestamps,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// GET points
// Route GET /api/point/:id
// Private route
const getPayerPointBalance = (req, res) => {
  res.status(200).json({ message: `Return all payer points ${req.params.id}` });
};

module.exports = {
  getTransactions,
  addTransaction,
  addPoints,
  getPayerPointBalance,
};
