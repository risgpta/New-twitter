import React from 'react';
import logo from '../assets/twitter.svg'; 
import '../App.css';
function Header(){
    return (
        <div className="header">
            <img src={logo} alt="logo" style={{height:'48px', width:'48px'}}/>
            <div className="headerContent">Home</div>
        </div>
    );
}

export default Header;