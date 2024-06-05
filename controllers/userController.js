const { CustomHttpError } = require("../utils/CustomError");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/user");
const sendToken = require("../utils/jwtToken.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
    });
    sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new CustomHttpError("Please provide email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
        return next(new CustomHttpError(401, "Invalid Credentials"));
    }
    sendToken(user, 200, res);
});
