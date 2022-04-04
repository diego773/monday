const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    payer: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    points: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  {
    timestamp: {
      type: Date,
    },
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
