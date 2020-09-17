import React from 'react';
import { useCookies } from 'react-cookie';

import '../App.css';

const Sidebar = () => {

    const [cookies, setCookie,removeCookie] = useCookies();

    function logout(){
        removeCookie('Token',{ path: '/' },-1);
    }
    return(
        <div className="sidebar">
            <div className="sidebarOptions">#Explore</div>
            <div className="sidebarOptions">Messages</div>
            <div onClick={logout} className="sidebarOptions">log out</div>
        </div>
    );
}

export default Sidebar;
