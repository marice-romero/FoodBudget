const Expense = require("../models/Expense");

const getAllQuotes = async (req, res) => {
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
  const {
    user: { userID },
    params: { id: expenseID },
  } = req;

  const expense = await Expense.findOne({
    _id: expenseID,
    createdBy: userID,
  });
};
