

const mongoose = require("mongoose");

const userResisterSchema =  new mongoose.Schema(

    {
      
        userName:{
            type:String,
            required:[true, "Please enter the User Name"]
        },
        contact:{
            type:String,
            required:[true, "Please enter the contact number"]
        },
        email:{
            type:String,
            required:[true, "Please enter the email"]
        },
        address:{
            type:String,
            required:[true, "Please enter the address"]
        },
        image:{
            type:String,
            required:[true, "Please enter the Image"]

        }
    }
);

const UserResister = mongoose.model("UserRegister",userResisterSchema);

module.exports=UserResister;