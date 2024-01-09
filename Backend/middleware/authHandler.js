const authenticateUser = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res
      .status(401)
      .send({
        msg: "You are not authorized to access this page. Please login and try again.",
      });
  }
  next();
};

module.exports = {
  authenticateUser,
};
