import React from 'react';

import "./message.css";


const Message = ({own}) => {
    return ( 
        <div className={own ? "message own":"message"}>
            <div className="messageTop">
                <img className ="messageImg" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkuP4A26vUkEZwYJL4zGV8KRxUbBmcX11Mdw&usqp=CAU" alt="" />
                <p className="messageText">Hello this is text</p>
                </div>
                <div className="maeesageBottom">
                    1 hour ago
                    </div>

        </div>
     );
}
 
export default Message;