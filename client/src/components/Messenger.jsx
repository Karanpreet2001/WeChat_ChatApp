import React, { useEffect, useState } from 'react';
import Converstation from './Converstations';
import Message from './Message';
import ChatOnline from './ChatOnline';
import axios from "axios";


const Messenger = () => {

    const contact="6047251852";

    const [conversation, setConversation]= useState([]);
    const [currentChat, setCurrentChat]= useState(null);
    const [messages, setMessages]= useState([]);


  

    useEffect(()=>{

        axios.get("http://localhost:5000/api/conversation/"+contact)
        .then(resp=>{console.log(resp.data);
                setConversation(resp.data)
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);

    
    


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
                    <Message/><Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>

                    </div>
                    <div className='chatBoxBottom'>
                        <textarea className="chatMessageBox" placeholder='Type here...'>

                        </textarea>
                        <button className='chatSubmitButton'>Send</button>

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