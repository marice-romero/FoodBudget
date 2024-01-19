const express = require("express");

const router = express.Router();

const {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseControllers");

router.get("/", getAllExpenses);
router.get("/:_id", getExpense);
router.post("/", createExpense);
router.put("/:_id", updateExpense);
router.delete("/:_id", deleteExpense);

module.exports = router;
