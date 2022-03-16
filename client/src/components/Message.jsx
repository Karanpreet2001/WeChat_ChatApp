import React from 'react';

import "./message.css";
import {format} from "timeago.js";


const Message = ({message, own}) => {
    return ( 
        <div className={own ? "message own":"message"}>
            <div className="messageTop">
                <img className ="messageImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuP4A26vUkEZwYJL4zGV8KRxUbBmcX11Mdw&usqp=CAU" alt="" />
                <p className="messageText">{message.text}</p>
                </div>
                <div className="maeesageBottom">
                   {format(message.createdAt)}
                    </div>

        </div>
     );
}
 
export default Message;