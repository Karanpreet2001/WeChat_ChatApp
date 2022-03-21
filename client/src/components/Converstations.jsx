import React, { useEffect, useState } from 'react';
import "./conversation.css";
import axios from "axios";


const Converstation = ({conversation, currentUser}) => {

    const [userContact, setUserContact]= useState([]);

    useEffect(()=>{

      const friendId = conversation.members.find(m=>m !==currentUser);
       console.log(friendId);

      const getUser = async()=>{

        try{
          const res = await axios("http://localhost:5000/api/user/"+friendId);
          console.log(res.data);
          setUserContact(res.data);
        }catch(err){
          console.log(err)
        }
      }
      getUser()
    
      },[currentUser,conversation]); 


    return ( 
        <div className="conversation">
            <img className="conversationImg" src={userContact[0]?.image} alt=""/>
            <span className="conversationName">{userContact[0]?.userName}</span>
        </div>
     );
     //new
}
 
export default Converstation;