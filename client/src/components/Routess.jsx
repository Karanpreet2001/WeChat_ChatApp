import React from 'react';
import {Route,Routes} from "react-router-dom";
import StartMessanger from './startMessager';
import Error from './Error';
import Login from './Login';






const Routess = () => {
    return ( 
        <div>
        <Routes>
        
        <Route path="/" exact element={<Login/>}></Route>
        <Route path="/start" element={<StartMessanger />}/>
        <Route path="/error" element={<Error/>}/>
        


 
        </Routes>
          </div>
     )
}
 
export default Routess;