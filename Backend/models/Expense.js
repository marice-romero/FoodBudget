const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    type: {
      type: String,
      enum: {
        values: [
          "grocery",
          "breakfast outing",
          "lunch outing",
          "dinner outing",
          "snack outing",
          "drinks",
          "other",
        ],
        message: "must select a valid type",
      },
    },
    tags: [
      {
        type: String,
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
