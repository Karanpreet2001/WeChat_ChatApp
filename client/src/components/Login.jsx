import axios from 'axios';
import React, { useEffect, useState } from 'react';

import {useNavigate} from "react-router-dom";



const Login = () => {
    const[user,setUser]=useState([]);

    const navigate= useNavigate();

    useEffect(()=>{

        axios.get("http://localhost:5000/api/user").then(resp=>setUser(resp.data)).catch(err=>console.log(err));
    },[]);

    console.log(user);


    const [email, setEmail]= useState();
    const [password, setPassword]= useState();
    
    console.log(email, password);
    

    const loginCheck = (e)=>{
        e.preventDefault();

            for(var i=0;i<user.length;i++){
                if(user[i].email===email && user[i].contact===password){
                    console.log("true");
                    navigate("/start" , {state: password})
                }
            }
    }
  

    return ( 

        <div>
            
            <form>
                <input type="text" name="email" id="email" onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/><br/><br/>
                <button className='' onClick={loginCheck}>Sign In</button>
            </form>
            
        </div>
     );
}
 
export default Login;