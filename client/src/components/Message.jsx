import React, { useEffect,useState } from 'react';

import "./message.css";
import {format} from "timeago.js";
import axios from 'axios';


const Message = ({message, own}) => {

    console.log(message,own);

    const [userImage, setUserImage]=useState([]);

    useEffect(()=>{
        const getImage= async ()=>{

            try{
                const resp= await axios.get("http://localhost:5000/api/user/"+message.sender);
                
                setUserImage(resp.data);


            }catch(err){
                console.log(err);
            }
        }
        getImage();
    },[message]);

    return ( 
        <div className={own ? "message own":"message"}>
            <div className="messageTop">
                <img className ="messageImg" src={userImage[0]?.image} alt="" />
                <p className="messageText">{message.text}</p>
                </div>
                <div className="maeesageBottom">
                   {format(message.createdAt)}
                    </div>

        </div>
     );
}
 
export default Message;