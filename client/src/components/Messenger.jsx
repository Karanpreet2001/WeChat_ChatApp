import React, { useEffect, useRef, useState } from 'react';
import Converstation from './Converstations';
import Message from './Message';
import ChatOnline from './ChatOnline';
import axios from "axios";
import {io} from "socket.io-client";


const Messenger = (cont) => {

    
    // const contact = props.contact;
    const contact = cont.userContact;

    const [conversation, setConversation]= useState([]);
    const [currentChat, setCurrentChat]= useState(null);
    const [messages, setMessages]= useState([]);
    const [newMessage, setNewMessage]= useState([]);
    const [arrivalMessage, setArrivalMessage]= useState(null);

    const scrollRef = useRef();
    const socket=useRef();

    // const users= useC


    useEffect(()=>{
            socket.current= io("ws://localhost:8900");
           
                socket.current.on("getMessage",data=>{
                    setArrivalMessage({
                        sender: data.senderId,

                        text: data.text,
                        createdAt: Date.now()
                    })
                })
  
    },[]);


    useEffect(()=>{
            arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)&&
            setMessages((prev)=>[...prev,arrivalMessage]);
    },[arrivalMessage, currentChat]);

    useEffect(()=>{
        socket.current.emit("addUser",contact);
        socket.current.on("getUsers",contacts=>{
            console.log(contacts)
        })
    },[contact]);

  

    useEffect(()=>{

        axios.get("http://localhost:5000/api/conversation/"+contact)
        .then(resp=>{
                setConversation(resp.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
 



    useEffect(()=>{

        const getMessages = async() =>{
            try{

                const res= await axios.get("http://localhost:5000/api/message/"+currentChat?._id);
                setMessages(res.data);
            }catch(err){
                console.log(err);

            }
        }
       getMessages();
        
    },[currentChat]);


    
   
    const handleSubmit =async ()=>{
      

        const message={
            sender: contact,
            text: newMessage,
            convId: currentChat._id
        }

        

        console.log(currentChat);
        // const receiverId = currentChat.find(currChat=>currChat.receiverId!==contact);  

        socket.current.emit("sendMesaage",{
            senderId:contact,
            receiverId:currentChat.receiverId,
             text:newMessage,
        })

        try{
            const res= await axios.post("http://localhost:5000/api/message",message);
            setMessages([...messages,res.data]);
            setNewMessage("");
            console.log(newMessage);

        }catch(err){
            console.log(err);
        }



    }


    useEffect(()=>{

        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[messages]);
    


    return ( 
        <div>

            <div className="massenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search For Friends" className="chatMenuInput"/>
  
                        {conversation.map((c)=>(
                            <div onClick={() => setCurrentChat(c)}>
                                <Converstation conversation={c} key={c._id}/>
                            </div>
                        ))}

                        
                        

                        </div></div>
                <div className="chatBox">
                <div className="chatBoxWrapper">


                    {

                        currentChat ? <>
                    
                    <div className='chatBoxTop'>
                        {
                            messages.map(m=>(
                                <div ref={scrollRef} key={m._id}>
                                <Message message={m} own={m.sender===contact}/> 
                                 </div>        
                            ))
                        }
                    
                 

                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className="chatMessageBox" placeholder='Type here...' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}>

                        </textarea>
                        <button className='chatSubmitButton' onClick={handleSubmit}>Send</button>

                    </div> </> : <span className="conversation-chat-msg">Open a conversation to start chat</span>

                            }
                    

                    </div></div>
                <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>
                    <ChatOnline/>

                </div>

            </div>
            </div>



        </div>
     );
}
 
export default Messenger;