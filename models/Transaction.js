const mongoose = require("mongoose");

const TransactionSquema = new mongoose.Schema({
  desc: {
    type: String,
    trim: true,
    required: [true, "Please add some text"],
  },
  amount: {
    type: Number,
    required: [true, "Please add an amount"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Transaction", TransactionSquema);
