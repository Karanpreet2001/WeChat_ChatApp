import React from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import Messenger from './Messenger';

const StartMessanger = () => {

    const location = useLocation();
    const data = location['state'];
    console.log(data);
    return ( 
        <div><Header/> 
                <Messenger userContact={data}/>
        </div>

     );
}
 
export default StartMessanger;