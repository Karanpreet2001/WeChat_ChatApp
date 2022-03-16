import React, { useEffect, useRef, useState } from 'react';
import Converstation from './Converstations';
import Message from './Message';
import ChatOnline from './ChatOnline';
import axios from "axios";


const Messenger = () => {

    const contact="6047251852";

    const [conversation, setConversation]= useState([]);
    const [currentChat, setCurrentChat]= useState(null);
    const [messages, setMessages]= useState([]);
    const [newMessage, setNewMessage]= useState([]);
    const scrollRef = useRef();



  

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

                const res= await axios.get("http://localhost:5000/api/message/"+currentChat._id);
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