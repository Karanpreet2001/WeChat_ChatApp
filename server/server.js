const express = require("express");
const app= express();
const cors=require("cors");
const mongoose = require("mongoose");


const Conversation = require("./models/converstaion.js");
const Message = require("./models/messages.js");
const UserRegister = require("./models/users.js");


const url="mongodb://localhost:27017/SocialDB"


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());




app.post("/api/conversation",async (req,res)=>{

    const {senderId,receiverId}= req.body;

    const conversation = new Conversation({
        senderId:senderId,
        receiverId:receiverId
    })

    try{

        await mongoose.connect(url);


        conversation.save((err)=>{
            if(err)
            console.log(err);
            else{
                console.log("The document is inserted");
                res.send(conversation);
                mongoose.connection.close();
            }
        });
       

    }catch(err){
        console.log(err);
    }
});

app.get("/api/conversation/:senderId", async (req,res)=>{


    let senderId = req.params.senderId;
    try{

        
        await mongoose.connect(url);

        const conversation = await Conversation.find({
            senderId:senderId
        });

        res.status(200).json(conversation);
   

    }catch(err){
        console.log(err);
    }
})

app.get("/api/message/:convId",async (req,res)=>{

 

    try{

        await mongoose.connect(url);

        const messages = await Message.find({
            convId: req.params.convId
        });
      
        res.status(200).json(messages);

    }catch(err){
        console.log(err);
    }
});

app.get("/api/user",async (req,res)=>{

 

    try{

        await mongoose.connect(url);

         UserRegister.find((err, user)=>{
             if(err) console.log(err);
             else{
                 res.send(user);
             }
         })

    }catch(err){
        console.log(err);
    }
});

app.get("/api/user/:contact",async (req,res)=>{


    try{

        await mongoose.connect(url);

        const user = await UserRegister.find({
            contact: req.params.contact
        });
      
        res.status(200).json(user);

    }catch(err){
        console.log(err);
    }
});

app.post("/api/user", async (req, res)=>{

    const {userName, contact, email, address, image}= req.body;

    const user =new UserRegister({
        userName:userName,
        contact:contact,
        email:email,
        address:address,
        image:image
    });

    try{

        await mongoose.connect(url);

        user.save((err)=>{
            if(err)
                console.log(err);
            else{
                res.send(user);
                console.log("the document is inserted");
            }

        })

    }catch(err){
        console.log(err);
    }
});

app.post("/api/message",async (req,res)=>{

    const {convId,sender,text}= req.body;

    const message = new Message({
        convId:convId,
        sender:sender,
        text:text
    })

    try{

        await mongoose.connect(url);

        message.save((err)=>{
            if(err)
            console.log(err);
            else{
                console.log("The document is inserted");
                res.send(message);
                mongoose.connection.close();
            }
        });
      

    }catch(err){
        console.log(err);
    }
});


app.listen(5000,()=>{
    console.log("Server is running at 5000");
})
