const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || 500,
    msg: err.message || "something went wrong, please try again later.",
  };

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `this ${Object.keys(
      err.keyValue
    )} already exists, please try again.`;
    customError.statusCode = 400;
  }
  if (err.name === "CastError") {
    customError.msg = `no entry found with id ${err.value}`;
    customError.statusCode = 404;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
