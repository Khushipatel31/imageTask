const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const { CustomHttpError } = require("../utils/CustomError");
const { errorHandler } = require("./errorHandling");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new CustomHttpError(401, "Please login to access resources"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  //if req.user.id then output is 65b65c2610ec34e544e7c796
  //if req._id output is new ObjectId('65b65c2610ec34e544e7c796')
  next();
});
