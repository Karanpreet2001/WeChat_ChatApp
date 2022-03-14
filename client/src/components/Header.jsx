import React from 'react';
import "./style.css"
import pic  from "../img/logo.jpg";

const Header = () => {
    return ( 

        <div className="wrapper">

            <header>
               
 
                <div className='head'>WE CHAT</div>
              
                

                <nav>
                    <ul className="nav_links">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
 
                    </ul>
                </nav>

                <a className="cta" href="#"><button>Contact</button></a>
            </header>
        </div>
     );
}
 
export default Header;