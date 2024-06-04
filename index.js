const app = require('./app');
const dotenv=require("dotenv");
const cloudinary=require("cloudinary");
dotenv.config();
require("./config/dbconfig").getDBConnection();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})

process.on("uncaughtException",(err)=>{
  console.log(`Uncaught Exception : ${err}`);
  process.exit(1);
})
const server=app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT} `);
});

process.on("unhandledRejection",err=>{
  console.log('Unhandled Promise Rejection',err);
  server.close(()=>{
    process.exit(1);
  })
})