import React, { useEffect, useState } from 'react';
import "./conversation.css";
import axios from "axios";


const Converstation = ({conversation}) => {

    const [userContact, setUserContact]= useState([]);

    useEffect(()=>{
        axios
          .get("http://localhost:5000/api/user/"+conversation.receiverId)
          .then(resp=>{
            console.log(resp,resp.data[0]);
            setUserContact(resp.data[0]);
          })
          .catch(err=>{
            console.log(err);
          })
    
      },[]); 


    return ( 
        <div className="conversation">
            <img className="conversationImg" src={userContact.image} alt=""/>
            <span className="conversationName">{userContact.userName}</span>
        </div>
     );
     //new
}
 
export default Converstation;