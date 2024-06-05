const express=require("express");
const userController = require('../controllers/userController');
const { isAuthenticatedUser } = require("../middleware/auth");
const router=express.Router();
router.route("/register").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.route("/image/new").post(isAuthenticatedUser,userController.addImage);
router.route("/images").get(isAuthenticatedUser, userController.getImages);
module.exports=router;