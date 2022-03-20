const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
});

let contacts=[];

const adduser=(contact,socketId)=>{
    !contacts.some(cont=>cont.contact===contact) &&
            contacts.push({contact,socketId});
};

const removeUser = (socketId)=>{
    contacts= contacts.filter(cont=>cont.socketId!=socketId);
}

const getuser=(contact)=>{
    return contacts.find(cont=>cont.contact===contact);
}

io.on("connection",(socket)=>{
    //when connect
    console.log("a user connected");

    // take userId and socketId from user
    socket.on("addUser",contact=>{
            adduser(contact,socket.id);
            io.emit("getUsers",contacts);
    });

    //send and get message
    socket.on("sendmessage",({senderId,receiverId,text})=>{
            const contact = getuser(receiverId);
            io.to(contact.socketId).emit("getMessage",{
                senderId,
                text,

            });
    });

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers",contacts);

});

});