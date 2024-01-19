const Expense = require("../models/Expense");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllExpenses = async (req, res) => {
  const { search, location, type, tag, sort } = req.query;
  const searchTerm = search || "";

  const queryObject = {};
  queryObject.createdBy = req.user._id;

  if (location) {
    queryObject.location = location;
  }
  if (type) {
    queryObject.type = type;
  }
  if (tag) {
    queryObject.tags = tag;
  }

  let result = Expense.find({
    $and: [
      queryObject,
      {
        $or: [
          { location: { $regex: searchTerm, $options: "i" } },
          { tag: { $regex: searchTerm, $options: "i" } },
        ],
      },
    ],
  });

  if (sort) {
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "highest") {
    }
  } else {
    result = result.sort({ createdAt: -1 });
  }

  const expenses = await result;

  res.status(200).json({ expenses });
};

const getExpense = async (req, res) => {
  const { _id } = req.params;

  const expense = await Expense.findOne({
    _id,
    createdBy: req.user._id,
  });

  if (!expense) {
    throw new NotFoundError("Could not find expense");
  }

  res.status(200).json({ expense });
};

const createExpense = async (req, res) => {
  req.body.createdBy = req.user._id;
  const expense = await Expense.create(req.body);
  res.status(201).json({ expense, msg: "Expense added!" });
};

const updateExpense = async (req, res) => {
  const { _id } = req.params;

  const updatedExpense = await Expense.findOneAndUpdate(
    { _id, createdBy: req.user._id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedExpense) {
    res.status(400);
    throw new NotFoundError("Could not find expense");
  }

  res.status(200).json({ updatedExpense, msg: "Expense updated!" });
};

const deleteExpense = async (req, res) => {
  const { _id } = req.params;

  const expense = await Expense.findOneAndDelete({
    _id,
    createdBy: req.user._id,
  });

  if (!expense) {
    res.status(400);
    throw new NotFoundError("Could not find expense");
  }

  res.json({ msg: "Expense successfully deleted" });
};

module.exports = {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
