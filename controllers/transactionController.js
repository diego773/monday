const db = require("../models/rewardsModel");

// Get transactions Return all payer point balances.
// Route POST /api/rewards/addtransactions
// Private route
const addTransactions = async (req, res) => {
  try {
    const { payer, points } = req.body;

    if (!payer || !points) {
      return res
        .status(404)
        .json({ message: "please add all required fields" });

      // Don't allow negative points be added to the database
    } else if (points < 0) {
      const newPayerPointBalance = await db.findOneAndUpdate(
        { payer },
        { $inc: { points: +points } },
        { new: true }
      );
      return res.status(422).json({
        message:
          "Negative points are not allowed to be added to the database, and will be subtracted from the payer's current point balance.",
        payer: newPayerPointBalance.payer,
        points: newPayerPointBalance.points,
        timestamps: newPayerPointBalance.createdAt,
      });

      // Add transaction to the database
    } else {
      const newTransaction = await db.create({
        payer,
        points,
      });
      console.log("New Transaction", newTransaction);

      if (newTransaction) {
        return res.status(201).json({
          _id: newTransaction._id,
          payer: newTransaction.payer,
          points: newTransaction.points,
          timestamps: newTransaction.createdAt,
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// Get Points Spend points using the rules above and return a list of
// Route POST /api/rewards/addpoints
// Private route
const spendPoints = async (req, res) => {
  try {
    const { payer, points } = req.body;

    if (points < 0) {
      const newPayerPointBalance = await db.findOneAndUpdate(
        { payer },
        { $inc: { points: +points } },
        { new: true }
      );

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

// ********** I need to work on this one
// POST transactions
// Route POST /api/rewards/addpoints/5000
// Private route
const fiveThousand = async (req, res) => {
  try {
    const { payer, points, timestamps } = req.body;

    // Check for the oldest date in the database
    const oldestTransaction = await db.findOne().sort({ createdAt: 1 });

    const oldestDate = oldestTransaction;
    console.log("oldestTransaction", oldestDate);

    // Check for the newest date in the database
    const newestTransaction = await db.findOne().sort({ createdAt: -1 });
    const newestDate = newestTransaction;
    console.log("newestTransaction", newestDate);

    // Check whether the oldest date is older than the newest date
    // const isOldestDateOlder = oldestDate > newestDate;
    // console.log("isOldestDateOlder", isOldestDateOlder);

    // Get the payers current points balance
    // const payerPointBalance = await db.find().sort({ payer });
  } catch (error) {
    console.error(error);
  }
};
// GET points
// Route GET /api/rewards/balance
// Private route
const getPayerPointBalance = async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addTransactions,
  spendPoints,
  fiveThousand,
  getPayerPointBalance,
};
