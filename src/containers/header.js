import React from 'react';
import logo from '../assets/twitter.svg'; 
import '../App.css';
import Signup from './signup';
import Login from './login';

import { useCookies } from 'react-cookie';

function Header(){
    const [cookies, setCookie] = useCookies();
    return ( 
            <div className="header">
            <img src={logo} alt="logo" style={{height:'48px', width:'48px'}}/>
            {
                cookies.Username === null || cookies.Username === undefined ? <div className="headerContent">Home</div>:<div className="headerContent">Hey Welcome {cookies.Username}!
                </div>
            }
            {
                cookies.Username === null || cookies.Username === undefined ?  <Signup/> : ''
            }
            {
                cookies.Username === null || cookies.Username === undefined ?  <Login/> : ''
            }
            </div>
    );
}

export default Header;