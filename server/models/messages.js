

const mongoose= require("mongoose");

const MesaageSchema = new mongoose.Schema(
    {
        convId:{
            type:String
        },
        sender:{
            type:String
        },
        text:{
            type:String
        }
    },
    {timestamps:true}
);

module.exports=mongoose.model("Message",MesaageSchema);