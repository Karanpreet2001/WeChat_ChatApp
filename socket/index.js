const io = require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000",
    }
});

let contacts=[];


const addUser=(contact,socketId)=>{

    
    !contacts.some(cont=>cont.contact===contact) &&
            contacts.push({contact,socketId});
};

const removeUser = (socketId)=>{
    contacts= contacts.filter(cont=>cont.socketId!==socketId);

    return contacts;
}

const getUser=(contact)=>{
 
    console.log(contacts);

    let main= contacts.find(cont=>cont.contact===contact);
    
    return main;
}

io.on("connection",(socket)=>{
    //when connect
    console.log("a user connected");

    // take userId and socketId from user
    socket.on("addUser",contact=>{
            addUser(contact,socket.id);
            io.emit("getUsers",contacts);
    });

    //send and get message
    socket.on("sendMessage",({senderId,receiverId,text})=>{
           
        
        const user = getUser(receiverId);

            io.to(user.socketId).emit("getMessage",{
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