const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardsSchema = new Schema(
  {
    payer: {
      type: String,
      trim: true,
      require: true,
    },
    points: {
      type: Number,
      trim: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Rewards = mongoose.model("Rewards", rewardsSchema);

module.exports = Rewards;
