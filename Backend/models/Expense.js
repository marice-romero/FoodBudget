const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    location: {
      type: String,
      required: "please provide a location!",
    },
    type: {
      type: String,
      enum: {
        values: ["grocery", "outing", "other"],
        message: "must select a valid type",
      },
    },
    tags: [
      {
        type: String,
      },
    ],
    amountSpent: {
      type: Number,
      required: [true, "please provide an amount!"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
