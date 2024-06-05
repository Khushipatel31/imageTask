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

exports.addImage = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const { title, description } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "imageManagement",
        width: 150,
        crop: "scale",
    });
    if (!user) {
        return next(new CustomHttpError(404, "No user exists"));
    }
    user.images.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
        title,
        description
    })
    await user.save();
    res.json({
        success: true,
        message: "Image added Successfully"
    });
})

exports.getImages = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        return next(new CustomHttpError(404, "No user exists"));
    }
    res.json({
        success:true,
        images:user.images
    })
})