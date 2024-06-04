const mongoose=require("mongoose");
require('dotenv').config()

const {MONGODB_URL}=process.env;
module.exports.getDBConnection=function(){
    mongoose.connect(MONGODB_URL).then(()=>console.log("DB connected"))
}