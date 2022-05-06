const db = require("../models/rewardsModel");

// Route POST /api/rewards/addtransactions
// Private route
const addTransactions = async (req, res) => {
  try {
    const { payer, points, timestamps } = req.body;

    if (!payer || !points || !timestamps) {
      return res
        .status(404)
        .json({ message: "please add all required fields" });
    }

    // Don't allow negative points be added to the database
    if (points < 0) {
      const negativeTransaction = await db.create({
        payer,
        points,
        timestamps,
      });

      return res.status(422).json({
        message:
          "Negative points are not allowed to be added to the database, and will be subtracted from the payer's current point balance.",
        payer: negativeTransaction.payer,
        points: negativeTransaction.points,
        timestamps: negativeTransaction.timestamps,
      });
    }

    const newTransaction = await db.create({
      payer,
      points,
      timestamps,
    });

    if (newTransaction) {
      return res.status(201).json({
        message:
          "New Transaction added to the database. Please check the database for the new transaction",
        payer: newTransaction.payer,
        points: newTransaction.points,
        timestamps: newTransaction.timestamps,
      });
    }
  } catch (error) {
    error.message;
  }
};

// Get Points Spend points using the rules above and return a list of
// Route POST /api/rewards/spendpoints
// Private route
const spendPoints = async (req, res) => {
  try {
    let { points } = req.body;

    let spendPoints = 0;
    let results = 0;

    let oldestTransaction = await db.find().sort({ timestamps: 1 });

    let negativeTransaction = await db.find({ points: { $lt: 0 } });

    let spendPointsArray = [];

    for (let i = 0; i < negativeTransaction.length; i++) {
      if (negativeTransaction[0].points < 0) {
        results = negativeTransaction[i].points + oldestTransaction[0].points;
        oldestTransaction[0].points = results;
        negativeTransaction[i].points = 0;
        await db.findByIdAndDelete(negativeTransaction[i]._id);
      }

      for (let j = 0; j < oldestTransaction.length; j++) {
        if (oldestTransaction[j].points < 0) {
          oldestTransaction[j].points = 0;

          oldestTransaction.splice(j, 1);
        }

        if (oldestTransaction[j].points < points) {
          points -= oldestTransaction[j].points;

          spendPoints = oldestTransaction[j].points;

          spendPointsArray.push({
            payer: oldestTransaction[j].payer,
            points: spendPoints * -1,
          });

          await db.findByIdAndUpdate(
            oldestTransaction[j]._id,
            oldestTransaction[j]
          );
        }

        if (
          oldestTransaction[j].points > points ||
          oldestTransaction[j].points === 0
        ) {
          oldestTransaction[j].points -= points;

          spendPoints = points;

          spendPointsArray.push({
            payer: oldestTransaction[j].payer,
            points: spendPoints * -1,
          });

          await db.findByIdAndUpdate(
            oldestTransaction[j]._id,
            oldestTransaction[j]
          );

          break;
        }
        oldestTransaction[j].points = 0;

        await db.findByIdAndUpdate(
          oldestTransaction[j]._id,
          oldestTransaction[j]
        );
      }
    }
    oldestTransaction.splice(0, 1);

    return res.status(200).json(spendPointsArray);
  } catch (error) {
    console.error(error);
  }
};

// GET points
// Route GET /api/rewards/pointsbalance
// Private route
const pointsBalance = async (req, res) => {
  try {
    let { payer } = req.body;

    let pointsBalanceObject = [];
    let pointsBalance = 0;

    let oldestTransaction = await db.find().sort({ timestamps: 1 });

    for (let i = 0; i < oldestTransaction.length; i++) {
      if (oldestTransaction[i].points < 0) {
        return res.status(422).json({
          message: "No points balance for this user",
        });
      }

      if (oldestTransaction[i].payer === payer) {
        pointsBalance += oldestTransaction[i].points;

        pointsBalanceObject.push({
          payer: oldestTransaction[i].payer,
          points: oldestTransaction[i].points,
        });
      }

      if (oldestTransaction[i].payer !== payer) {
        oldestTransaction.splice(i, 1);
        pointsBalance += oldestTransaction[i].points;

        pointsBalanceObject.push({
          payer: oldestTransaction[i].payer,
          points: oldestTransaction[i].points,
        });
      }

      if (oldestTransaction[i].points === 0) {
        oldestTransaction.splice(i, 1);

        pointsBalanceObject.push({
          payer: oldestTransaction[i].payer,
          points: oldestTransaction[i].points,
        });

        oldestTransaction.splice(i, 1);
        if (oldestTransaction[i].points > 0) {
          pointsBalance += oldestTransaction[i].points;

          pointsBalanceObject.push({
            payer: oldestTransaction[i].payer,
            points: oldestTransaction[i].points,
          });
        }
      }
    }
    oldestTransaction.splice(0, 1);

    await db.deleteMany({});

    return res.status(200).json(pointsBalanceObject);
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  addTransactions,
  spendPoints,
  pointsBalance,
};
