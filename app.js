const express = require("express");
const app=express();
const cors = require('cors');
const morgan=require("morgan")
const dotenv=require("dotenv");
dotenv.config();
app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
const { errorHandler } = require("./middleware/errorHandling");
const cookieParser=require("cookie-parser");
app.use(cookieParser())
app.use(cors());

//Middleware for error
app.use(errorHandler);
module.exports=app; 